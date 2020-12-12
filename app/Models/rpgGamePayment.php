<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class RpgGamePayment extends Model{
	
	protected $table = 'payments';
	protected $primaryKey = 'id';
	
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
		'amount', 'rpg_game_user_id'
    ];
	
    public function user() {
		return $this->belongsTo('App\Models\rpgGameUser', 'rpg_game_user_id');	
	}	
}