<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class microblogUser extends Model
{//
	protected $table = 'microblogUsers';
	protected $primaryKey = 'id';
	
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user', 'password',
    ];
	
	//public function user()
	//{
	//	return $this->belongsTo('App\User');
	//}
}
?>