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
use DateTime;
use DateInterval;

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
		
		$user = RpgGameUser::create(request(['name', 'email', 'password']));
		
		Auth::guard('rpgUser')->login($user, true);
		//Auth::guard('api')->login($user, true);
		//$token = $user->createToken('rpgGameUser')->accessToken;
		 
		return redirect()->to('/rpgGame');
	}

	private function sendResetEmail($email, $token)
	{	
		$user = RpgGameUser::where('email', $email)->first();
		//Generates the password reset link and token
		try {
			$text = "127.0.0.1:8082/rpgGame/passwordReset?token=" . $token . "&email=" . urlencode($email);
			$data = array('link' => $text);
			Mail::send('rpgGameResetMail', $data, function($message) {
				$message->to($email, 'user')->subject('RpgGame password reset email');
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
		$user = RpgGameUser::where('email', $email)->first();
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

		$user = RpgGameUser::where('email', $tokenData->email)->first();
		// Redirect the user back if the email is invalid
		if (!$user) 
			return redirect()->back()->withErrors(['email' => 'Email not found']);
		
		//update the new password, hashed by model function already
		$userData = $request->password;
		$query = RpgGameUser::where('email', $request->email)->first();
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
				$message->to($request->user)->subject('RpgGame password reset email');
				$message->from('alanygchow@gmail.com','Alan');
			});
			return redirect('/login')->with('message', 'pass changed mail sent!'); 
		}
		catch (Exception $e) {
			echo("<script>console.log('" . $e . "');</script>");
		}
	}

	public function addAvatar(Request $request) 
	{
		//gets user, to update record with an avatar image
		$username = auth::guard('rpgUser')->user()->name;
		$myUser = RpgGameUser::where('name', $username)->first();
		//if has image, processes and stores
		if($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            //getting timestamp
            $timestamp = str_replace([' ', ':'], '-', Carbon::now()->toDateTimeString());
            $name = $timestamp. '-' .$file->getClientOriginalName();
            $file->move(public_path().'/img/rpgGame/', $name);
            $myUser->avatar = url('/img/rpgGame/' . $name);
			$myUser->save();	
        }
		return view('rpgGameUserPanel', ['avatar' => $myUser->avatar]);
	}	
	
	public function home(Request $request) 
	{
		$username = auth::guard('rpgUser')->user()->name;
		
		//$username = auth('api')->user();
		//passport
		$myUser = RpgGameUser::where('name', $username)->first();
		$request->session()->put('avatar', $myUser->avatar);
		
		if ($myUser->membership == true){
			
			//check if premium expires today, removes if true
			$date = new DateTime("now");
			if(!$myUser->membershipEnd >= $date) {
				$myUser->membershipBegin = null;
				$myUser->membershipEnd  = null;
				$myUser->membership = false;
				$myUser->save();
			}
			if($myUser->saveGame != null)
				return view('rpgGame', 
					['data' => '<button id="restoreButton" type="button" class="introButtons btn btn-primary active w-100">Load Backup Data</button>', 
					'membership' => 'Premium', 'endDate' => 'till: ' . $myUser->membershipEnd]);
			else	
				return view('rpgGame', ['membership' => 'Premium', 'endDate' => 'till: ' . $myUser->membershipEnd]);
		}
		else
			if($myUser->saveGame != null)
				return view('rpgGame', 
					['data' => '<button id="restoreButton" type="button" class="introButtons btn btn-primary active w-100">Load Backup Data</button>', 
					'membership' => 'Normal', 'endDate' => '']);
			else
				return view('rpgGame', ['membership' => 'Normal', 'endDate' => '']);
	}
	
	public function addMembership(Request $request) 
	{
		$username = auth::guard('rpgUser')->user()->name;
		$myUser = RpgGameUser::where('name', $username)->first();
		$userCredits = $myUser->credits;
		if($myUser->credits < 10) {
			if($myUser->credits == null)
				$userCredits = 0;
			return view('rpgGameStore', ['credits' => $userCredits, 'message' => 'Not enough credits.']);
		}
		else if ($myUser->membership == true){
			return view('rpgGameStore', ['credits' => $userCredits, 'message' => 'Already have membership.']);
		}	
		else {
			$myUser->credits -= 10;
			$date = new DateTime("now");
			$myUser->membershipBegin = $date;
			$expiryDate = new DateTime("now");
			$expiryDate->add(new DateInterval('P30D'));
			$myUser->membershipEnd = $expiryDate;
			$myUser->membership = true;
			$myUser->save();
			return view('rpgGameStore', ['credits' => $myUser->credits, 'message' => 'Membership added.']);
		}
	}
	
	public function usermanagement(Request $request)
	{
		if(auth::guard('rpgUser')->user() == null)
			return redirect()->to('/rpgGame');
		$authName = auth::guard('rpgUser')->user()->name;
		$myUser = RpgGameUser::where('name', $authName)->first();
		$name = $myUser->name;
		$email = $myUser->email;
		return view('rpgGameUserPanel', ['avatar' => $myUser->avatar, 'currentName' => $name, 'currentEmail' => $email]);
	}	
	
	public function updateName(Request $request) 
	{
		$authName = auth::guard('rpgUser')->user()->name;
		$myUser = RpgGameUser::where('name', $authName)->first();
		$userName = $request->name;
		$userNameConf = $request->nameConf;
		//pop field
		$email = $myUser->email;
		
		if($userName === $userNameConf) {
			$myUser->name = $userName;
			$myUser->save();
			//update friend db for new name
			$friends = $myUser->friends;
			foreach ($friends as $friend) {
				$friend->name = $userName;
				$friend->save();
			}
			//update score db for new name
			$score = $myUser->score;
			$score->name = $userName;
			$score->save();
			return view('rpgGameUserPanel', 
				['avatar' => $myUser->avatar,'message' => 'Changed name from ' . $authName . ' to ' . $userName, 
				'currentName' => $userName, 'currentEmail' => $email]);
		}
		else
			return view('rpgGameUserPanel', 
				['avatar' => $myUser->avatar,'errorMessage' => 'Names don\'t match.', 
				'currentName' => $authName, 'currentEmail' => $email]);
	}
	
	public function updateEmail(Request $request) 
	{
		$authName = auth::guard('rpgUser')->user()->name;
		$myUser = RpgGameUser::where('name', $authName)->first();
		$origEmail = $myUser->email;
		$email = $request->email;
		$emailConf = $request->emailConf;
		//pop field
		$name = $myUser->name;
		if($email === $emailConf) {
			$myUser->email = $email;
			$myUser->save();
			return view('rpgGameUserPanel', 
				['avatar' => $myUser->avatar,'message' => 'Changed email from ' . $origEmail . ' to ' . $email, 
				'currentName' => $name, 'currentEmail' => $email]);
		}
		else
			return view('rpgGameUserPanel', 
				['avatar' => $myUser->avatar,'errorMessage' => 'Emails don\'t match.',
				'currentName' => $name, 'currentEmail' => $email]);
	}
	
	public function updatePassword(Request $request) 
	{
		$authName = auth::guard('rpgUser')->user()->name;
		$myUser = RpgGameUser::where('name', $authName)->first();
		$password = $request->password;
		$passwordConf = $request->passwordConf;
		$origPass = $myUser->password;
		//pop fields
		$name = $myUser->name;
		$email = $myUser->email;
		if($password === $passwordConf) {
			$myUser->password = $password;
			$myUser->save();
			return view('rpgGameUserPanel', 
				['avatar' => $myUser->avatar,'message' => 'Password updated.', 
				'currentName' => $name, 'currentEmail' => $email]);
		}
		else
			return view('rpgGameUserPanel', 
				['avatar' => $myUser->avatar,'errorMessage' => 'Passwords don\'t match.', 
				'currentName' => $name, 'currentEmail' => $email]);		
	}
	
	public function deleteAccount(Request $request) 
	{
		$this->validate(request(), [
			'password' => 'required',
			'passwordConf' => 'required'
		]);
		
		$authName = auth::guard('rpgUser')->user()->name;
		$myUser = RpgGameUser::where('name', $authName)->first();
		$password = $request->password;
		$passwordConf = $request->passwordConf;
		
		if($password === $passwordConf) {
			$check = Hash::check($password, $myUser->password);
			if($check) {
				$myUser->delete();
				Auth::guard('rpgUser')->logout();
				//return redirect()->to('/rpgGame/');
				return redirect('/login')->with('message', 'User ' . $authName . ' account deleted!'); 
			}
			else {
				return view('rpgGameUserPanel', 
				['avatar' => $myUser->avatar,'errorMessage' => 'Password is incorrect', 
				'currentName' => $myUser->name, 'currentEmail' => $myUser->email]);	
			}	
		}
		else
			return view('rpgGameUserPanel', 
				['avatar' => $myUser->avatar,'errorMessage' => 'Passwords don\'t match.', 
				'currentName' => $myUser->name, 'currentEmail' => $myUser->email]);	
	}
}