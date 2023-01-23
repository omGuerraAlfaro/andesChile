<?php

namespace App\Http\Controllers;
use App\User; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;    
use Illuminate\Support\Facades\Hash;
use App\VariablesGlobales;

class RegistroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
        $existe=User::where(['email'=>$request->input('correo')])->first();
        if(!is_object($existe))
        {
            User::create(
            [
                'name'=>$request->input('nombre'),
                'email'=>$request->input('correo'),
                'password'=>Hash::make($request->input('password')),
                'created_at'=>date('Y-m-d H:i:s')
            ]);
            return response()->json(array('estado'=>'ok'), 200);
        }else
        {
            return response()->json(array('estado'=>'repetido'), 200);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }
}
