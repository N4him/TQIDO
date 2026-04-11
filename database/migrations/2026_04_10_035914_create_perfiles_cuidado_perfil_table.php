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
        Schema::create('perfiles_cuidado_perfil', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('perfil_id');
            $table->string('nombre');
            $table->string('rol');
            $table->string('especificacion');
            $table->string('edad');
            $table->string('movilidad');
            $table->string('medicacion');
            $table->string('alergias');
            $table->string('diagnostico');
            $table->string('contacto_emergencia');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perfiles_cuidado_perfil');
    }
};
