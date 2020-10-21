<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\rpgGameUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

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
		//Generates the password reset link and token
		try {
			$text = "127.0.0.1:8082/rpgGame/passwordReset?token=" . $token . "&email=" . urlencode($user->email);
			$data = array('link' => $text);
			Mail::send('rpgGameResetMail', $data, function($message) {
			$message->to('tilldusk@gmail.com', 'user')->subject
			('RpgGame password reset email');
			$message->from('alanygchow@gmail.com','Alan');
			});

			if( count(Mail::failures()) > 0 ) {
				
				return redirect('/login')->with('message', 'Error when reset email sent!');
			   echo("<script>console.log('There were mail errors.');</script>");
				
			   foreach(Mail::failures() as $emailAddr) {
				   echo("<script>console.log('" . $emailAddr . "');</script>");
				} 
			} 
			else {
				return redirect('/login')->with('message', 'Reset email sent!'); 
			}
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

	public function newPass(Request $request) {
		//validates input
		$validator = Validator::make($request->all(), [
			'email' => 'required',
			'password' => 'required|confirmed',
			'token' => 'required' 
		]);

		if ($validator->fails()) {
			return redirect()->back()->withErrors(['email' => 'Please complete the form!']);
		}

		// Validate the token
		$tokenData = DB::table('rpguserreset')->where('token', $request->token)->first();
		// Redirect the user back to the password reset request form if the token is invalid
		if (!$tokenData)
			return redirect('/login')->with('message', 'Your reset token is invalid!'); 

		$user = rpgGameUser::where('email', $tokenData->email)->first();
		// Redirect the user back if the email is invalid
		if (!$user) 
			return redirect()->back()->withErrors(['email' => 'Email not found']);
		
		//update the new password, hashed by model function already
		$userData = $request->password;
		$query = rpgGameUser::where('email', $request->email)->first();
		$query->password = $userData;
		$query->save();

		//login the user immediately they change password successfully
		Auth::guard('rpgUser')->login($user, true);
		return redirect('/rpgGame'); 

		//Deletes the token
		DB::table('rpguserreset')->where('email', $request->email)->delete();

		//Send Email Reset Success Email
		try {
			
			$data = array('note' => 'password reset successful!');
			Mail::send('rpgGameResetMailConf', $data, function($message) {
				$message->to('tilldusk@gmail.com', 'user')->subject
				('RpgGame password reset email');
				$message->from('alanygchow@gmail.com','Alan');
			});
			return redirect('/login')->with('message', 'pass changed mail sent!'); 
		}
		catch (Exception $e) {
			echo("<script>console.log('" . $e . "');</script>");
		}
	}	
}