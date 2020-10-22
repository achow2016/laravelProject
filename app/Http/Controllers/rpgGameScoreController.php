<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//models
use App\Models\rpgGameScore;
use Illuminate\Support\Facades\Auth;

class scoreViewController extends Controller {

	public function scores() 
	{
		$scores = rpgGameScore::all();
		return view('rpgGameScores', ['scores' => $scores]);
	}

	public function detail(Request $request) 
	{
		$profile = rpgGameScore::where('name', $request->input('name'))->first();
		return view('rpgGameScores', ['profile' => $profile]);
	}

	public function add(Request $request)
	{
		$profile = rpgGameScore::where('name', $request->input('name'))->first();
		if($profile != null)
			rpgGameScore::where('name', $request->input('name'))->delete();

		$name = $request->input('name');
		$kills = $request->input('kills');
		$damageDone = $request->input('damageDone');
		$damageReceived = $request->input('damageReceived');
		$chaptersCleared = $request->input('chaptersCleared');
		$earningsTotal = $request->input('earningsTotal');
		$scoreTotal = $request->input('scoreTotal');
		
		$rpgGameScore = new rpgGameScore();
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
}
?>