<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


//models
use App\Models\rpgGameUser;
use App\Models\rpgGameScore;
use App\Models\rpgGameFriend;
use Illuminate\Support\Facades\Auth;

class ScoreViewController extends Controller {

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
		$profile = RpgGameScore::where('name', $request->input('name'))->first();
		if($profile != null)
			RpgGameScore::where('name', $request->input('name'))->delete();

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

			$scores = RpgGameScore::all();
			return view('rpgGameScores', ['scores' => $scores]);
		}
		else {
			$errorMessage = "Duplicate friend, not added!";
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