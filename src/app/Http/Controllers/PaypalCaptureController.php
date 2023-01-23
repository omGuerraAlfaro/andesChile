<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\VariablesGlobales;
use App\OrdenesPaypal;
class PaypalCaptureController extends Controller
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
         
        $id=$request->input('id');
        $orden=OrdenesPaypal::where(['orden'=>$id ])->firstOrFail();
          
        //se solicita la aprobación orden de pedido
        $headers = [
            "Content-Type"  => "application/json",
        ];
        $response  =   Http::withToken($orden->token)
        ->withHeaders($headers)
        ->send("POST", VariablesGlobales::find(1)->valor."/v2/checkout/orders/".$orden->orden."/capture");
        if(isset($response->json()['id']))
        {
             $orden->nombre=$response->json()['payment_source']['paypal']['name']['given_name']." ".$response->json()['payment_source']['paypal']['name']['surname'];
            $orden->correo=$response->json()['payment_source']['paypal']['email_address'];
            $orden->id_captura=$response->json()['purchase_units'][0]['payments']['captures'][0]['id'];
            $orden->country_code=$response->json()['payment_source']['paypal']['address']['country_code'];
            $orden->estado=1;
            
            $orden->save();
            return json_encode(array('estado'=>'ok'));
        }else
        {
            return json_encode(array('estado'=>'error'));
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
