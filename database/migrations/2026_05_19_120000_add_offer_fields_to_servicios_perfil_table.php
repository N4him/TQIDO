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
            $table->decimal('precio_hora', 10, 2)->nullable()->after('precio');
            $table->decimal('precio_oferta', 10, 2)->nullable()->after('precio_hora');
            $table->boolean('oferta_activa')->default(false)->after('precio_oferta');
        });

        DB::table('servicios_perfil')
            ->whereNull('precio_hora')
            ->update([
                'precio_hora' => DB::raw('precio'),
                'oferta_activa' => false,
            ]);
    }

    public function down(): void
    {
        Schema::table('servicios_perfil', function (Blueprint $table) {
            $table->dropColumn(['precio_hora', 'precio_oferta', 'oferta_activa']);
        });
    }
};
