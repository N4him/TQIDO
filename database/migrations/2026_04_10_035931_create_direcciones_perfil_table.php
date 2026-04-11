<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('direcciones_perfil', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('perfil_id');
            $table->string('label')->nullable();// Casa
            $table->string('address_line_1');
            $table->string('address_line_2')->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('reference')->nullable();
            $table->boolean('is_default')->default(false);
            $table->string('type')->default('home');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('direcciones_perfil');
    }
};
