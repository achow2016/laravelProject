<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{//
	protected $table = 'posts_table';
	protected $primaryKey = 'posts_id';
	
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        //'name', 'email', 'password',
		'user_id', 'title', 'comment', 'priority', 'author', 'author_picture' 
    ];
	
	public function user()
	{
		return $this->belongsTo('App\User');
	}
}
?>