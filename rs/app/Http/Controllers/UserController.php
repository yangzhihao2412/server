<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use App\User;
use App\Jobs\SendReminderEmail;
use Carbon\Carbon;

class UserController extends Controller
{

    public function index(Request $request)
    {
//        \DB::table('a')->select();
        
//         $id = 1;
//         $user = User::findOrFail($id);
        
       
//         var_dump($user->email);
//         $job = (new SendReminderEmail($user))->delay(60);
//         $this->dispatch($job);

//         $value = Cache::get('key');

        
//         $cacheInfo = \DB::table('cache')->where('id',2)->get();
//         var_dump($cacheInfo);
//         exit();

        
//         $value = \Cache::remember('users', 1, function (){
//             return \DB::table('users')->get();
//         });
        
        
        \Cache::tags(['a','b'])->put('yzh', 'fnjksnfjkndsjkfns');
        \Cache::tags(['a','c'])->put('yzh1', 'asdjhsjvhbdhshasoqiwoiqdiojweoidjwioeojdiowejfio');
        
        $value = \Cache::get('yzh1');
        
        
        
        
        var_dump($value);
        
        exit();
        
        \Cache::forever('zhihao', 'yangzhihao');
        
        $value = \Cache::get('zhihao');
        
        
        
        var_dump($value);
        
        
        
        
        
        
        
        
        
        
        
        exit();
        
       if (\Cache::add('u', 'sadsfvfvsgtdgtgrgrtg', 2)){
           $value = \Cache::get('u');
       } else {
           $value = \DB::table('users')->get();
       }
        
        var_dump($value);
        
        
        
        
        exit();
        
        
        \Cache::put('user', 'assdsfdsfdsfs',1);
        
        if (\Cache::has('user')){
            echo 1111;
            $value = \Cache::get('user');
        } else {
            
            $value = 'aaaaaaaaa';
            echo 2222;
        }
        
        var_dump($value);
        
        
        
        exit();
        
        $value = \Cache::pull('users');
        
        
        if (\Cache::has('users')){
            echo 11111;
        } else {
            echo 22222;
        }
        
        var_dump($value);
        
        exit();
        
        if (\Cache::has('id')){
            echo 1111;
        } else {
            echo 222;
        }
        exit();
        
           $value = \Cache::get('key',function (){
               echo 1111;
               return \DB::table('cache')->get();
           });
           var_dump($value);
           exit();
        
        
        
        
        
    }
}
?>