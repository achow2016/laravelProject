<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class RpgGameNotification extends Model{
	
	protected $table = 'notifications';
	protected $primaryKey = 'id';
	
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
		'text', 'rpg_game_user_id'
    ];
	
    public function user() {
		return $this->belongsTo('App\Models\rpgGameUser', 'rpg_game_user_id');	
	}	
}