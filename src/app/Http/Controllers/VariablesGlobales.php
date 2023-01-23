<?php

namespace App;
 
use Illuminate\Database\Eloquent\Model;

class VariablesGlobales extends Model
{ 
    protected $guarded =[];
    public $timestamps = false;
    protected $table = 'variables_globales';
}
