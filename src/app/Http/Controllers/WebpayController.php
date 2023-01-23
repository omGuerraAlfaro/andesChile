<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\VariablesGlobales;
class WebpayController extends Controller
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
        $response  = Http::withHeaders(
            [
                'Content-Type' => 'application/json',
                'Tbk-Api-Key-Id'=>VariablesGlobales::find(5)->valor,
                'Tbk-Api-Key-Secret'=>VariablesGlobales::find(6)->valor
            ]
        )->post(VariablesGlobales::find(4)->valor, 
        [
            'buy_order' => 'ordenCompra12345678',
            'session_id' => 'sesion1234557545',
            'amount' => $request->input('amount'),
            'return_url'=>'http://192.168.2.110:8080/webpay-respuesta'
        ]);
        if($response->status()!=200)
        {
            die("error ".$response->status());
        }
        return $response->body();
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
