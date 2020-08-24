<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
	//For login route on unauthorized access to dashboard
    public function home()
	{
		return view('index');
	}
	
	public function index()
	{
		return view('index');
	}
}

