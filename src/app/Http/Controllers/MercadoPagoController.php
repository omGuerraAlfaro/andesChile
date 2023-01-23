<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\VariablesGlobales;
use App\OrdenesMercadoPago;
use MercadoPago; 
class MercadoPagoController extends Controller
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
        MercadoPago\SDK::setAccessToken(VariablesGlobales::find(9)->valor);
    
        $preference = new MercadoPago\Preference();
        $preference->back_urls=
            array(
                "success"=>"http://192.168.1.88:8080/mercado-pago-respuesta",
                "failure"=>"http://192.168.1.88:8080/mercado-pago-error",
                "pending"=>"http://192.168.1.88:8080/mercado-pago-pendiente"
            )
        ;
        $monto=$request->input('amount');
        $preference->auto_return="approved";
        $item = new MercadoPago\Item();
        $item->title="Curso de PHP";
        $item->quantity=1;
        $item->unit_price=$monto;
        $preference->items=array($item);
        $preference->save();
        OrdenesMercadoPago::create(
            [
                'preference_id'=>$preference->id,
                'collection_id'=>'',
                'collection_status'=>'',
                'payment_id'=>'',
                'status'=>'',
                'payment_type'=>'',
                'merchant_order_id'=>'',
                
                'site_id'=>'',
                'processing_mode'=>'',
                'merchant_account_id'=>'',
                'estado'=>0,
               'fecha'=>date('Y-m-d H:i:s'),
            ]);
        return  json_encode(array('id'=>$preference->id));
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
