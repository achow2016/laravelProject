<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class microblogPost extends Model
{//
	protected $table = 'microblogPosts';
	protected $primaryKey = 'id';
	
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        //'name', 'email', 'password',
		//'user_id', 'title', 'comment', 'priority', 'author', 'author_picture'
		'author', 'title', 'content', 'contentPreview', 'postImage',
    ];
	
	//public function user()
	//{
	//	return $this->belongsTo('App\User');
	//}
}
?>