<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRpgusersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
	 
	protected $casts = [
        'saveGame' => 'array'
    ];
	
    public function up()
    {
        Schema::create('rpgGameUsers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
			$table->binary('avatar')->nullable();
			$table->integer('credits')->nullable();
			$table->boolean('membership')->nullable();
			$table->date('membershipBegin')->nullable();
			$table->date('membershipEnd')->nullable();
			$table->integer('playtime')->nullable();
			$table->json('saveGame')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('rpgGameUsers');
    }
}
