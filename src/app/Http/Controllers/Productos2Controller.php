<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Productos;
use App\ProductosFotos;
class Productos2Controller extends Controller
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
        
        $datos=Productos::orderBy('id', 'desc')->get();
        foreach($datos as $dato)
            {
                $fotos=ProductosFotos::where(['productos_id'=>$dato->id])->get();
                $f=array();
                foreach($fotos as $foto)
                {
                    $f[]=array('id'=>$foto->id, 'link'=>$foto->nombre);
                }
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
                    "fotos"=>$f
                );
            
            } 
            return response()->json( array('datos'=>$array));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
