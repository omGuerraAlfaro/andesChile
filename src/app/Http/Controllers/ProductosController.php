<?php

namespace App\Http\Controllers;

use App\Productos;
use App\ProductosFotos;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request; 
use Illuminate\Support\Str;
use Firebase\JWT\JWT;

class ProductosController extends Controller
{
    public function __construct()
    { 
        $this->middleware('verificacion');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $porpagina=2;
        $datos=Productos::orderBy('id', 'desc')->paginate($porpagina);
        $array=array();
        if($datos->total()==0)
        { 
            return response()->json( array('total'=>0,'por_pagina'=>sizeof($array), 'links'=>0,'datos'=>$array));
        }else
        {
            
            foreach($datos as $dato)
            {
                
                $array[]=array(
                    "id"=>$dato->id,
                    "nombre"=>$dato->nombre,
                    "slug"=>$dato->slug,
                    "descripcion"=>$dato->descripcion,
                    "fecha"=>$dato->fecha,
                    "precio"=>$dato->precio,
                    "stock"=>$dato->stock,
                    "categorias_id"=>$dato->categorias_id,
                    "categoria"=>$dato->categorias->nombre,
                    "categoria_slug"=>$dato->categorias->slug
                );
            
            }
            $links=$datos->total()/$porpagina;
            return response()->json( array('total'=>$datos->total(),'por_pagina'=>sizeof($array), 'links'=>number_format($links, 0 , '', ''), 'datos'=>$array));
        }
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /*
    {
    "nombre": "Categoría 4ssss",
    "descripcion":"sombra de mi bosque si",
    "precio":123,
    "stock":"110",
    "categorias_id":2
    }
    */
    public function store(Request $request)
    {
        $json = json_decode(file_get_contents('php://input') , true);
        if(!is_array($json ))
        {
       		$array=
		        	array
		        	(
		        		'response'=>array
			        	(
			        		'estado'=>'Bad Request',
			        		'mensaje'=>'La peticion HTTP no trae datos para procesar ' 
			        	)
		        	)
		        ;  	
		    return response()->json($array, 400);
        }
        
        Productos::create(
            [
                'nombre'=>$request->input('nombre'),
                'slug'=>Str::slug($request->input('nombre'), '-'),
                'descripcion'=>$request->input('descripcion'), 
                'precio'=>$request->input('precio'), 
                'stock'=>$request->input('stock'),
                'categorias_id'=>$request->input('categorias_id'),
                'fecha'=>date('Y-m-d')
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
        $datos=Productos::where(['id'=>$id])->first();
        if(!is_object($datos))
        {
            $array=array
                (
                    'estado'=>'error',
                    'mensaje'=>'No existe el registro', 
                ); 
            return response()->json( $array, 404);
        }else
        {
            return response()->json( array(
                    "id"=>$datos->id,
                    "nombre"=>$datos->nombre,
                    "slug"=>$datos->slug,
                    "descripcion"=>$datos->descripcion,
                    "fecha"=>$datos->fecha,
                    "precio"=>$datos->precio,
                    "stock"=>$datos->stock,
                    "categorias_id"=>$datos->categorias_id,
                    "categoria"=>$datos->categorias->nombre
                ), 200);
        }
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
        $datos=Productos::where(['id'=>$id])->first();
       if(!is_object($datos))
       {
            $array=array
                    (
                        'estado'=>'error',
                        'mensaje'=>'No existe el registro', 
                    ); 
        return response()->json( $array, 404);
       }else
       {
        $json = json_decode(file_get_contents('php://input'), true);
        if(!is_array($json ))
            {
                $array=
                        array
                        (
                            'response'=>array
                            (
                                'estado'=>'Bad Request',
                                'mensaje'=>'La peticion HTTP no trae datos para procesar ' 
                            )
                        )
                    ;  	
                return response()->json($array, 400);
            }
        //ejecuto el update
        $datos->nombre=$json['nombre'];
        $datos->slug=Str::slug($json['nombre'], '-');
        $datos->precio=$json['precio'];
        $datos->descripcion=$json['descripcion'];
        $datos->stock=$json['stock'];
        $datos->categorias_id=$json['categorias_id'];
        $datos->save();
        //retorno un json
        $array=array
                    (
                        'estado'=>'ok',
                        'mensaje'=>'Se modificó el registro', 
                    ); 
        return response()->json( $array, 201);
       }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Productos::where(['id'=>$id])->firstOrFail();
        $existe = ProductosFotos::where(['productos_id'=>$id])->count();
        if($existe==0)
        {
            Productos::where(['id'=>$id])->delete();
            $array=array
                        (
                            'estado'=>'ok',
                            'mensaje'=>'Se eliminó el registro', 
                        ); 
            return response()->json( $array, 201);
        }else
        { 
            $array=array
                        (
                            'estado'=>'Bad Request',
                            'mensaje'=>'No se puede eliminar el registro', 
                        ); 
            return response()->json( $array, 400);
        }
    }
}
