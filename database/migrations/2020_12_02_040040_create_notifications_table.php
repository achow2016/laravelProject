<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::dropIfExists('notifications');
        Schema::create('notifications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('text');
			$table->integer('rpg_game_user_id')->unsigned();
			$table->foreign('rpg_game_user_id')->references('id')->on('rpgGameUsers')->onDelete('cascade'); 
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
        Schema::dropIfExists('notifications');
    }
}
