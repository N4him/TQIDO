<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('servicios_perfil', function (Blueprint $table) {
            $table->decimal('precio', 10, 2)->nullable()->after('tipo');
            $table->string('estado')->default('borrador')->after('descripcion');
        });

        DB::table('servicios_perfil')
            ->whereNull('estado')
            ->orWhere('estado', '')
            ->update(['estado' => 'activo']);
    }

    public function down(): void
    {
        Schema::table('servicios_perfil', function (Blueprint $table) {
            $table->dropColumn(['precio', 'estado']);
        });
    }
};
