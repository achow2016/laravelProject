<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//models
use App\Models\rpgGameScore;

class scoreViewController extends Controller {
	public function scores() 
	{
		$scores = rpgGameScore::all();
		return view('rpgGameScores', ['scores' => $scores]);
	}

	public function add(Request $request)
	{	
		$name = $request->input('name');
		$kills = $request->input('kills');
		$damageDone = $request->input('damageDone');
		$damageReceived = $request->input('damageReceived');
		$chaptersCleared = $request->input('chaptersCleared');
		
		$rpgGameScore = new rpgGameScore();
		$rpgGameScore->setAttribute('name', $name);
		$rpgGameScore->setAttribute('kills', $kills);
		$rpgGameScore->setAttribute('damageDone', $damageDone);
		$rpgGameScore->setAttribute('damageReceived', $damageReceived);
		$rpgGameScore->setAttribute('chaptersCleared', $chaptersCleared);
		
		$rpgGameScore->save();	
		return view('rpgGame/readScores');
	}
}
?>