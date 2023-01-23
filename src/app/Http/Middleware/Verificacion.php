<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\VariablesGlobales;
class Verificacion
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $headers = explode(' ', $request->header('Authorization'));
        if(!isset( $headers[1]))
        {
            $array=
		        	array
		        	(
		        		'response'=>array
			        	(
			        		'estado'=>'Unauthorized',
			        		'mensaje'=>'Acceso no autorizado ' 
			        	)
		        	)
		        ;  	
		    return response()->json($array, 401);
        }
        //decodificar el token
        $decoded = JWT::decode($headers[1], new Key(VariablesGlobales::find(11)->valor, 'HS256'));
        //validar si es válido o no
        $fecha = strtotime(date('Y-m-d H:i:s'));
        //echo $decoded->iat." | ".$fecha;exit;
        
        if($decoded->iat > $fecha)
        {
            $array=
		        	array
		        	(
		        		'response'=>array
			        	(
			        		'estado'=>'Unauthorized',
			        		'mensaje'=>'Acceso no autorizado ' 
			        	)
		        	)
		        ;  	
		    return response()->json($array, 401);
        } 
        
        return $next($request);
    }
}
