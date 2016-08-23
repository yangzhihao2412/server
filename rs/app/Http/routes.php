<?php

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Route::get('/', function () {
//     return view('greeting', ['name' => 21321]);
// });

//     Route::get('blade', function () {
//         return view('child');
//     });

// Route::get('profile/{user}',function (App\User $user){
//     if ($user->name){
//         var_dump($user->name);
//     }
// });

Route::get('/', function () {
    return view('welcome');
});

    Route::get('auth/register', function () {
        return view('auth.login');
    });


Route::get('/home', 'UserController@index');

Route::group(['middleware' => 'web'], function () {
    Route::auth();
});

    Route::get('/', function () {
        return view('welcome');
    });

    
    
    \Route::resource('post', 'PostController');
Route::auth();

Route::get('/home', 'HomeController@index');
