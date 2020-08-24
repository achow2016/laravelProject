<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class scoreViewController extends Controller {
   public function index() {
      $players = DB::select('select * from players');
      return view('scores',['players'=>$players]);
   }
}

?>
