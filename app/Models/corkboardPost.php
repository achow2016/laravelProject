<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class CorkboardPost extends Model
{//
	protected $table = 'CorkboardPosts';
	protected $primaryKey = 'posts_id';
	
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        //'name', 'email', 'password',
		//'user_id', 'title', 'comment', 'priority', 'author', 'author_picture'
		'author', 'comment'
    ];
	
	//public function user()
	//{
	//	return $this->belongsTo('App\User');
	//}
}
?>