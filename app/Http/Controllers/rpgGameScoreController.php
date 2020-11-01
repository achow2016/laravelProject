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
		return view('rpgGameScores', ['scores' => $scores]);
	}

	public function detail(Request $request) 
	{
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
		$user = RpgGameUser::where('name', $request->input('name'))->first();
		$profile = RpgGameScore::where('name', $request->input('name'))->first();
		
		//$friend = new RpgGameFriend;
		$friend = new RpgGameFriend();
		$friend->setAttribute('name', $user->name);
		$friend->setAttribute('score', $profile->scoreTotal);
		$friend->save();	
		//$friend->name = $user->name;
		//$friend->score = $user->scoreTotal;
		$user = $user->friends()->saveMany([$friend]);
	}	
	
	//associtiation friend to another
	//$comment = Comment::find(1); $post = Post::find(2); $comment->post()->associate($post)->save();
	
	public function friends() 
	{
		$username = auth()->user()->name;
		$user = RpgGameUser::where('name', 'a')->first();
		/*
		$user = RpgGameUser::where('name', $username)->first();
		$friends = $user->friends;
		dd($friends);
		$friend = RpgGameFriend::find(1); 
		$user = $friend->user;
		dd($user);
		*/
		
		//$friends = RpgGameFriend::where('rpg_game_user_id', 1)->first();
		$friends = RpgGameFriend::where('name', 'a')->first();
		return view('rpgGameScores', ['friends' => $friends]);	
	}
}
?>