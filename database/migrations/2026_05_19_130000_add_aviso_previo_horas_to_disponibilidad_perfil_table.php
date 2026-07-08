<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('disponibilidad_perfil', function (Blueprint $table) {
            $table->unsignedInteger('aviso_previo_horas')->nullable()->after('duracion_minima_minutos');
        });
    }

    public function down(): void
    {
        Schema::table('disponibilidad_perfil', function (Blueprint $table) {
            $table->dropColumn('aviso_previo_horas');
        });
    }
};
