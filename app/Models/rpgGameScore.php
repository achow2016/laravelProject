<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class RpgGameScore extends Model
{//
	protected $table = 'rpgGameScore';
	protected $primaryKey = 'id';
	
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
		'name', 'kills', 'damageDone', 'damageReceived', 'chaptersCleared', 'totalEarnings', 'scoreTotal', 'rpg_game_user_id'
    ];
	
	 public function user()
    {
        return $this->belongsTo('App\Models\rpgGameUser', 'rpg_game_user_id');
    }
}
?>