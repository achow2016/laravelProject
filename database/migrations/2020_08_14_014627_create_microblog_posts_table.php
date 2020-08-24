<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMicroblogPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('microblogPosts', function (Blueprint $table) {
            $table->increments('id');
			$table->string('author');
			$table->string('title');	
			$table->string('content');
			$table->string('contentPreview');
			$table->binary('postImage');
			
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('microblogPosts');
    }
}
