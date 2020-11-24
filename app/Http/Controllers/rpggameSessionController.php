<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Models\rpgGameUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use DateTime;

class rpgGameSessionController extends Controller
{
    public function create()
    {
        return view('register');
    }
	
	//login, record playtime
    public function store(Request $request)
    {
		//$user = rpgGameUser::find();
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
			Auth::guard('rpgUser')->login($user, true);
			$timeCookie = Cookie::make("gameTime", date("h:i:s"));

			//check if premium expires today, removes if true
			$date = new DateTime("now");
			if(!$user->membershipEnd >= $date) {
				$user->membershipBegin = null;
				$user->membershipEnd  = null;
				$user->membership = false;
				$user->save();
			}
			
			return redirect('/rpgGame')->withCookie($timeCookie); 
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
}