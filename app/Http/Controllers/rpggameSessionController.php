<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Models\rpgGameUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class rpgGameSessionController extends Controller

{
    public function create()
    {
        return view('register');
    }

    public function store(Request $request)
    {
		//$user = rpgGameUser::find();
		$email = $request->input('email');
		$password = $request->input('password');
		$user = rpgGameUser::where('email', $email)->first();

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
			return redirect('/rpgGame'); 
		}
		else {
			return redirect('/login')->with('message', 'Wrong password!'); 
		}
    }
    
    public function destroy()
    {
        Auth::guard('rpgUser')->logout();
        return redirect()->to('/rpgGame/');
    }
}