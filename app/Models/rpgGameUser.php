<?php

namespace App\Models;

//use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class RpgGameUser extends Authenticatable
{
    use Notifiable;

	protected $table = 'rpgGameUsers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'avatar', 'credits', 'membership', 'membershipBegin', 
			'membershipEnd', 'playtime', 'saveGame'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        //'email_verified_at' => 'datetime',
    ];
	
	/*
	* Hashes passwords
	*/
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }
	
	public function friends()
	{
		return $this->hasMany('App\Models\rpgGameFriend', 'rpg_game_user_id', 'id');
	}
	
	public function notifications()
	{
		return $this->hasMany('App\Models\rpgGameNotification', 'rpg_game_user_id', 'id');
	}
	
	public function score()
	{
		return $this->hasOne('App\Models\rpgGameScore', 'rpg_game_user_id', 'id');
	}
}
