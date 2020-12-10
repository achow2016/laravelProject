<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Models\rpgGameUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use DateTime;
use Illuminate\Support\Facades\Response;

class rpgGameSessionController extends Controller
{	
    public function create()
    {
        return view('register');
    }
	
	//login, record playtime
    public function store(Request $request)
    {
		$data = $request->all();
		
		$rules = [
			'email' => 'required',
			'password' => 'required',
			//'g-recaptcha-response' => 'required'
		];
		
		$validator = Validator::make($request->all(), $rules);
		if ($validator->fails()) {
			return back()->withErrors(['Input(s) missing.']);
		}

		//$secret = env("RECAPTCHA_SECRET");
		/*
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS,
		//"secret=".$secret."&response=".$data['g-recaptcha-response']);
		"secret=".env('RECAPTCHA_SECRET')."&response=".$data['g-recaptcha-response']);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		$responseData = json_decode($result , TRUE);
		curl_close ($ch);

		if($responseData['success'] == false){
			return back()->withErrors(['Recaptcha not completed.']);
		}
		*/
		
		$email = $request->input('email');
		$password = $request->input('password');
		$user = RpgGameUser::where('email', $email)->first();	
		
		
		//if user not found, will setup return to login
		
		if($user)
			$check = Hash::check($password, $user->password);
		else
			return redirect('/login')->with('message', 'User does not exist!'); 
		
		//debug helper
		//echo("<script>console.log('PHP: " . $user . "');</script>");
		
		//check password, returns error if incorrect
		if($check) {
			//passport
			//auth()->user()->createToken('rpgGameUser')->accessToken;
			//Auth::guard('api')->login($user, true);
			
			Auth::guard('rpgUser')->login($user, true);
			
			$timeCookie = Cookie::make("gameTime", date("h:i:s"));
			//name cookie for pusher, without encryption, checked against auth when performing operations later server side
			//$nameCookie = Cookie::make("login_name", $user->name, 9999, null, null, false, false);
			$nameCookie = Cookie::make("login_name", $user->name, 9999, null, null, false, false);

			//check if premium expires today, removes if true
			$date = new DateTime("now");
			if(!$user->membershipEnd >= $date) {
				$user->membershipBegin = null;
				$user->membershipEnd  = null;
				$user->membership = false;
				$user->save();
			}
			//with time cookie and name cookie(for pusher)
			return redirect('/rpgGame')
				->withCookie($timeCookie) 
				->withCookie($nameCookie); 
		}
		else {
			return redirect('/login')->with('message', 'Wrong password!'); 
		}		
    }
    //logout, record playtime
    public function destroy(Request $request)
    {
		$timeCookie = $request->cookie('gameTime');
		$currentTime =  time();
		$playTime = $currentTime - strtotime($timeCookie);
		$username = auth::guard('rpgUser')->user()->name;
		$user = RpgGameUser::where('name', $username)->first();
		$userPlaytime = intval($playTime) + $user->playtime;
		$user->playtime = $userPlaytime;
		$user->save();
		
        Auth::guard('rpgUser')->logout();
        return redirect()->to('/rpgGame/');
        //return redirect('/login')->with('message', $playTime); 
    }
	
	//saves localstorage into db (json field)
	public function backup(Request $request) 
	{
		$password = $request->input('password');
		$profile = RpgGameUser::where('name', $request->input('name'))->first();
		
		if($profile)
			$check = Hash::check($request->password, $profile->password);
		else
			return Response::json(['error' => 'User does not exist.'],400);
		
		if($check) {
			$name = $request->input('name');
			//$name = $request->user()->name;
			$saveGame = $request->input('archive');
			$profile = RpgGameUser::where('name', $name)->first();
			$profile->saveGame = $saveGame;
			$profile->save();
		}
		else
			return Response::json(['error' => 'Password is incorrect.'],400);
	}
	
	//restores localstorage from db (json field)
	public function getBackup(Request $request) 
	{
		header("Access-Control-Allow-Origin: *");
		$user = RpgGameUser::where('email', $request->email)->first();	
		if($user)
			$check = Hash::check($request->password, $user->password);
		else {
			echo 'User does not exist! (Retry)';
			exit;
		}
		if($check) 
			$saveGame = $user->saveGame;
		else {
			echo 'Wrong password! (Retry)';
			exit;
		}
		echo json_encode($saveGame);
		exit;
	}
}