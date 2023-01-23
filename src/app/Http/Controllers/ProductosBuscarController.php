<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Productos;
use App\Categorias;
class ProductosBuscarController extends Controller
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
        $datos=Productos::where('nombre', 'like', '%'.$_GET['search'].'%')->orderBy('id', 'desc')->paginate($porpagina);
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
        $categoria=Categorias::where(['slug'=>$id])->firstOrFail();
        $porpagina=2;
        $datos=Productos::where(['categorias_id'=>$categoria->id])->orderBy('id', 'desc')->paginate($porpagina);
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
