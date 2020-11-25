<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFriendTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::dropIfExists('friends');
        Schema::create('friends', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('rpg_game_user_id')->unsigned();
			$table->string('name');
			$table->integer('score');
            $table->timestamps();
			$table->foreign('rpg_game_user_id')->references('id')->on('rpgGameUsers')->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('friends');
    }
}
