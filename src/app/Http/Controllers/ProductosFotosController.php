<?php

namespace App\Http\Controllers;

use App\ProductosFotos;
use App\Productos;
use App\VariablesGlobales;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductosFotosController extends Controller
{
    public function __construct()
    {
        #$this->middleware('auth.basic'); 
        $this->middleware('verificacion');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos = ProductosFotos::orderBy('id', 'desc')->get();
        return response()->json($datos, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(empty($_FILES["imagen"]["tmp_name"]))
        {
            $array=
		        	array
		        	(
		        		'response'=>array
			        	(
			        		'estado'=>'Conflict',
			        		'mensaje'=>'La imagen es obligatoria ' 
			        	)
		        	)
		        ;  	
		    return response()->json($array, 200);
        }
        if($_FILES["imagen"]["type"]=='image/jpeg' or $_FILES["imagen"]["type"]=='image/png')
        {
            
            switch($_FILES["imagen"]["type"])
            {
                case 'image/jpeg':
                    $archivo =time().".jpg";
                break;
                case 'image/png':
                    $archivo =time().".png";
                break;
            } 
            copy($_FILES["imagen"]["tmp_name"], VariablesGlobales::find(10)->valor."uploads/productos/".$archivo);
        }else
        {
            $array=
		        	array
		        	(
		        		'response'=>array
			        	(
			        		'estado'=>'Conflict',
			        		'mensaje'=>'La foto es no tiene formato válido' 
			        	)
		        	);  	
		    return response()->json($array, 200);
        }
        ProductosFotos::create(
            [ 
                'nombre'=>$archivo,
                'productos_id'=>$request->input('productos_id'),
            ]
            );
        $array=array
                    (
                        'estado'=>'ok',
                        'mensaje'=>'Se creó el registro exitosamente', 
                    ); 
        return response()->json( $array, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $existe=Productos::where(['id'=>$id])->firstOrFail();
        $datos=ProductosFotos::where(['productos_id'=>$id])->orderBy('id', 'desc')->get();
        $array=array();
        foreach($datos as $dato)
            {
                $array[]=array
                (
                    'id'=>$dato->id,
                    'foto'=>"http://" . dirname($_SERVER['SERVER_NAME'] . "" . $_SERVER['PHP_SELF']) . "/"."uploads/productos/".$dato->nombre
                );
            }
            return response()->json( $array, 200);
        return response()->json( $array, 200);
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=ProductosFotos::where(['id'=>$id])->firstOrFail();
        unlink(VariablesGlobales::find(10)->valor."/uploads/productos/".$datos->nombre);
        //unlink();
        ProductosFotos::where(['id'=>$id])->delete();
        $array=array
                        (
                            'estado'=>'ok',
                            'mensaje'=>'Se eliminó el registro', 
                        ); 
        return response()->json( $array, 200);
    }
}
