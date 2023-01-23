<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\VariablesGlobales;
use App\OrdenesPaypal;
class PaypalController extends Controller
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
        //se solicita token
        $responseToken=Http::withBasicAuth(VariablesGlobales::find(2)->valor, VariablesGlobales::find(3)->valor)->asForm()->post(VariablesGlobales::find(1)->valor."/v1/oauth2/token", [
            'grant_type' => 'client_credentials'
        ]);
        $token=  $responseToken->json()['access_token'] ;
        $orden=OrdenesPaypal::create(
            [
               'token'=>$token,
               'orden'=>'' ,
               'nombre'=>'',
               'correo'=>'',
               'id_captura'=>'',
               'monto'=>$request->input('amount'),
               'country_code'=>'',
               'estado'=>0,
               'fecha'=>date('Y-m-d H:i:s'),
               'paypal_request'=>''
            ]); 
        //se solicita la orden de pedido 
        $response  = Http::withHeaders(
            [
                'Authorization' => "Bearer ".$token,
                'PayPal-Request-Id'=>"order_".$orden->id
            ]
        )->post(VariablesGlobales::find(1)->valor."/v2/checkout/orders",
        [
            'intent' => 'CAPTURE',
                'purchase_units' => [
                    0 => [
                        "reference_id"=> "reference_".$orden->id,
                        'amount' => [
                            'currency_code' => 'USD',
                            'value' => $request->input('amount'),
                        ]
                    ]
                ],
                'payment_source' => [
                    'paypal'=>[
                        'experience_context'=>[
                            "payment_method_preference"=>"IMMEDIATE_PAYMENT_REQUIRED",
                            "payment_method_selected"=> "PAYPAL",
                            "brand_name"=> "Tamila",
                            "locale"=> "en-US",
                            "landing_page"=> "LOGIN",
                            "shipping_preference"=> "SET_PROVIDED_ADDRESS",
                            "user_action"=> "PAY_NOW",
                            "return_url"=> "http://192.168.1.88:8080/paypal-respuesta",
                            "cancel_url"=> "http://192.168.1.88:8080/paypal-cancelado"
                        ]
                        
                    ]
                    
                ]
        ]);
        if($response->status()!=200)
        {
            die("error ".$response->status());
        }
        $ordenBd=OrdenesPaypal::find($orden->id);
        $ordenBd->orden=$response->json()['id'];
        $ordenBd->save();
        //
        return  json_encode(array('url'=>$response->json()['links'][1]['href'], 'orden'=>"order_".$orden->id));
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
