<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\rpgGameUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Mail;

class rpggameRegistrationController extends Controller
{
	public function create()
	{
		return view('register');
	}

	public function loginReset()
	{
		return view('rpgGameLoginReset');
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

	private function sendResetEmail($email, $token)
	{
		$user = rpgGameUser::where('email', $email)->first();
		//Generate, the password reset link. The token generated is embedded in the link
		$link = config('base_url') . 'password/reset/' . $token . '?email=' . urlencode($user->email);
		try {
		//Here send the link with CURL with an external email API 
			$data = array('link'=>$link);

		//debug helper
		echo("<script>console.log('PHP: " . $email . "');</script>");

			Mail::send($email, $data, function($message) {
				$message->to($user->email, 'user')->subject
				('RpgGame password reset request');
				$message->from('alanygchow@gmail.com','alan');
			});
			return redirect('/login')->with('message', 'Reset email sent!'); 
		} catch (\Exception $e) {
			return redirect('/login')->with('message', 'Mailing error!'); 
		}
	}

	public function validatePassReset(Request $request) {
		$this->validate(request(), [
			'email' => 'required|email'
		]);
		$email = $request->input('email');
		$user = rpgGameUser::where('email', $email)->first();
		if(!$user)
			return redirect('/login')->with('message', 'User does not exist!'); 
		
		//token work
		DB::table('rpguserreset')->insert([
			'email' => $request->email,
			'token' => Str::random(60),
			'created_at' => Carbon::now()
		]);

		$tokenData = DB::table('rpguserreset')->where('email', $request->email)->first();

		//calls mailer function
		if ($this->sendResetEmail($request->email, $tokenData->token)) {
			return redirect('/login')->with('message', 'Reset email sent!'); 
		} 
		else {
			return redirect('/login')->with('message', 'Network error!'); 
		}
		
	}

	public function resetPass(Request $request) {

	}
}