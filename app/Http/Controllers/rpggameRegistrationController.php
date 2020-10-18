<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\rpgGameUser;
use Illuminate\Support\Facades\Auth;
class rpggameRegistrationController extends Controller
{
	public function create()
	{
		return view('register');
	}

	public function store()
	{
		$this->validate(request(), [
			'name' => 'required',
			'email' => 'required|email',
			'password' => 'required'
		]);
		
		$user = rpgGameUser::create(request(['name', 'email', 'password']));
		
		Auth::guard('rpgUser')->login($user, true);
		
		return redirect()->to('/rpgGame');
	}
}