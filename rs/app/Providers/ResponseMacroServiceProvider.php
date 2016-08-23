<?php

namespace App\Providers;


use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Response;

class ResponseMacroServiceProvider extends ServiceProvider{
    public function boot(){
        Response::macro('caps',function ($value){
            return Response::make(strtoupper($value));
        });
    } 
    
}




?>