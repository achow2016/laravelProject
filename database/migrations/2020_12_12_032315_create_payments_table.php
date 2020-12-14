<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::dropIfExists('payments');
        Schema::create('payments', function (Blueprint $table) {
            $table->bigIncrements('id');
			$table->decimal('amount', $precision = 12, $scale = 2); //precision.scale\
			$table->string('email');
			$table->string('name');
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
        Schema::dropIfExists('payments');
    }
}
