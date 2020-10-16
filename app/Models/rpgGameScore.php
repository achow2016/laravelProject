<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class rpgGameScore extends Model
{//
	protected $table = 'rpgGameScore';
	protected $primaryKey = 'id';
	
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
		'name', 'kills', 'damageDone', 'damageReceived', 'chaptersCleared', 'totalEarnings', 'scoreTotal'
    ];
}
?>