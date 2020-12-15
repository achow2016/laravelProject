<?php

namespace App\Http\Controllers;

use App\Models\rpgGameUser;
use App\Models\rpgGameScore;
use App\Models\rpgGameFriend;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;
use App\SendUserReport;
use Event;
use App\Events\PrivateMessage;

class ScoreViewController extends Controller {
	use SendUserReport;
	
	public function scores() 
	{
		$scores = RpgGameScore::all();
		//$username = auth()->user()->name;
		$username = auth::guard('rpgUser')->user()->name;
		$myScore = RpgGameScore::where('name', $username)->first();
		if($myScore != null)
			$myScore = RpgGameScore::where('name', $username)->first()->value('scoreTotal');
		if($myScore != 0)
			return view('rpgGameScores', ['scores' => $scores, 'myScore' => $myScore]);
		else {
			$myScore = 0;
			return view('rpgGameScores', ['scores' => $scores, 'myScore' => $myScore]);
		}
	}

	public function detail(Request $request) 
	{
		
		$username = $request->input('name');
		$user = RpgGameUser::where('name', $username)->first();
		$request->session()->put('otherAvatar', $user->avatar);
		
		$profile = RpgGameScore::where('name', $request->input('name'))->first();
		return view('rpgGameScores', ['profile' => $profile]);
	}

	public function add(Request $request)
	{
		$password = $request->input('password');
		//if score found, delete old
		$profile = RpgGameScore::where('name', $request->input('name'))->first();
		if($profile) {
			$user = RpgGameUser::where('name', $request->input('name'))->first();
			$check = Hash::check($request->password, $user->password);
			if($check)
				RpgGameScore::where('name', $request->input('name'))->delete();
			else
				return Response::json(['error' => 'Password is incorrect.'],400);
		}
		//add new score record	
		$user = RpgGameUser::where('name', $request->input('name'))->first();
		$check = Hash::check($request->password, $user->password);
		if(!$check)
			return Response::json(['error' => 'Password is incorrect.'],400);
		$name = $request->input('name');
		$kills = $request->input('kills');
		$damageDone = $request->input('damageDone');
		$damageReceived = $request->input('damageReceived');
		$chaptersCleared = $request->input('chaptersCleared');
		$earningsTotal = $request->input('earningsTotal');
		$scoreTotal = $request->input('scoreTotal');
		
		$rpgGameScore = new RpgGameScore();
		$rpgGameScore->setAttribute('name', $name);
		$rpgGameScore->setAttribute('kills', $kills);
		$rpgGameScore->setAttribute('damageDone', $damageDone);
		$rpgGameScore->setAttribute('damageReceived', $damageReceived);
		$rpgGameScore->setAttribute('chaptersCleared', $chaptersCleared);
		$rpgGameScore->setAttribute('earningsTotal', $earningsTotal);
		$rpgGameScore->setAttribute('scoreTotal', $scoreTotal);

		$username = $request->input('name');
		$user = RpgGameUser::where('name', $username)->first();
		$rpgGameScore->setAttribute('rpg_game_user_id', $user->id);
		
		$rpgGameScore->save();	
		return view('rpgGame');
	}
	
	public function addFriend(Request $request) 
	{
		//first check if duplicates
		//$username = auth()->user()->name;
		$username = auth::guard('rpgUser')->user()->name;
		$user = RpgGameUser::where('name', $username)->first();
		$friends = $user->friends->where('name', $request->input('name'))->first();
		
		//if not duplicate
		if(!$friends) {		
			$user = RpgGameUser::where('name', $request->input('name'))->first();
			$profile = RpgGameScore::where('name', $request->input('name'))->first();
			
			$friend = new RpgGameFriend();
			$friend->setAttribute('rpg_game_user_id', $profile->id);
			$friend->setAttribute('name', $user->name);
			$friend->setAttribute('score', $profile->scoreTotal);			
			$user = $user->friends()->save($friend);

			//dispatch event to target user
			Event::dispatch(new PrivateMessage($request->input('name'), null, $request->input('name')));
			$message = $username . " added you as a friend!";
			$this->sendUserReport($message, $username, $request->input('name'));

			$scores = RpgGameScore::all();
			return view('rpgGameScores', ['scores' => $scores, 'message' => 'Added ' . $request->input('name') . ' to friend list!']);
		}
		else {
			$errorMessage = $request->input('name') . ' is already a friend!';
			$scores = RpgGameScore::all();
			return view('rpgGameScores', ['scores' => $scores, 'errorMessage' => $errorMessage]);
		}	
	}	
	
	public function friends() 
	{
		//$username = auth()->user()->name;
		$username = auth::guard('rpgUser')->user()->name;
		$user = RpgGameUser::where('name', $username)->first();
		$friends = $user->friends;
		return view('rpgGameScores', ['friends' => $friends]);	
	}
}
?>