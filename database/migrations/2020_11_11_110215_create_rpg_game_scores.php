<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRpgGameScores extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::dropIfExists('rpgGameScore');
        Schema::create('rpgGameScore', function (Blueprint $table) {
            $table->increments('id');
			$table->string('name');
			$table->integer('kills');	
			$table->integer('damageDone');
			$table->integer('damageReceived');
			$table->integer('chaptersCleared');
			$table->integer('earningsTotal');
			$table->integer('scoreTotal');
			$table->integer('rpg_game_user_id')->unsigned();
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
        //Schema::table('rpgGameScores', function (Blueprint $table) {
            //
        //});
		Schema::dropIfExists('rpgGameScore');
    }
}
