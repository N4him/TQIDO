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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('fecha_nacimiento')->nullable();
            $table->string('direccion')->nullable();
            $table->string('ciudad')->nullable();
            $table->string('area_ocupacional')->nullable();
            $table->text('descripcion_personal')->nullable();
            $table->string('idiomas')->nullable();
            $table->string('dni')->nullable();
            // $table->string('tipo_cuidado')->nullable();
            // $table->string('experiencia')->nullable();
            // $table->string('certificaciones')->nullable();
            // $table->string('preferencias')->nullable();
            // $table->string('dni_frontal')->nullable();
            // $table->string('dni_trasera')->nullable();
            // $table->string('certificados')->nullable();
            $table->text('descripcion_general_servicio')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
