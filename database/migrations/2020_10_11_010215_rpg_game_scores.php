<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RpgGameScores extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rpgGameScore', function (Blueprint $table) {
            $table->increments('id');
			$table->string('name');
			$table->integer('kills');	
			$table->integer('damageDone');
			$table->integer('damageReceived');
			$table->integer('chaptersCleared');
			$table->integer('earningsTotal');
			$table->integer('scoreTotal');
			
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
        //Schema::table('rpgGameScores', function (Blueprint $table) {
            //
        //});
		Schema::dropIfExists('rpgGameScore');
    }
}
