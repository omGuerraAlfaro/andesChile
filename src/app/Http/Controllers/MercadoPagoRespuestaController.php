<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\VariablesGlobales;
use App\OrdenesMercadoPago;
class MercadoPagoRespuestaController extends Controller
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
        /*
            {
            "preference_id": "1249226080-6c1a61fb-ba1f-42f4-a2f4-f20114e95eeb",
            "mercado-pago-respuesta":"1311045153",
            "collection_status":"approved",
            "payment_id":"1311045153",
            "status":"status",
            "external_reference":null,
            "payment_type":"credit_card",
            "merchant_order_id":"6640400918",
            "site_id": "MLC",
            "processing_mode": "aggregator",
            "merchant_account_id":"merchant_account_id"
        }
        */
        $datos=OrdenesMercadoPago::where(['preference_id'=>$request->input('preference_id'), 'estado'=>0])->first();
        if(is_object($datos))
        {
            $datos->collection_id=$request->input('collection_id');
            $datos->collection_status=$request->input('collection_status');
            $datos->payment_id=$request->input('payment_id');
            $datos->status=$request->input('status');
            $datos->payment_type=$request->input('payment_type');
            $datos->merchant_order_id=$request->input('merchant_order_id');
            $datos->site_id=$request->input('site_id');
            $datos->processing_mode=$request->input('processing_mode');
            $datos->merchant_account_id=$request->input('merchant_account_id');
            $datos->estado=1;
            $datos->save();
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
