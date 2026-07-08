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
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_user_id');
            $table->unsignedBigInteger('carer_user_id');
            $table->unsignedBigInteger('carer_profile_id');
            $table->unsignedBigInteger('servicio_perfil_id');
            $table->date('fecha_servicio');
            $table->time('hora_inicio');
            $table->time('hora_fin');
            $table->unsignedInteger('duracion_minutos');
            $table->string('direccion_servicio');
            $table->text('notas')->nullable();
            $table->decimal('precio_hora', 10, 2);
            $table->decimal('precio_total', 10, 2);
            $table->string('estado')->default('pendiente');
            $table->timestamp('respondida_en')->nullable();
            $table->timestamp('cancelada_en')->nullable();
            $table->timestamp('iniciada_en')->nullable();
            $table->timestamp('completada_en')->nullable();
            $table->string('motivo_rechazo')->nullable();
            $table->string('motivo_cancelacion')->nullable();
            $table->timestamps();

            $table->foreign('customer_user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('carer_user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('carer_profile_id')->references('id')->on('profiles')->cascadeOnDelete();
            $table->foreign('servicio_perfil_id')->references('id')->on('servicios_perfil')->cascadeOnDelete();

            $table->index(['customer_user_id', 'estado']);
            $table->index(['carer_user_id', 'estado']);
            $table->index(['carer_profile_id', 'fecha_servicio']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
