<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DisponibilidadPerfil extends Model
{
    protected $table = 'disponibilidad_perfil';

    protected $fillable = [
        'perfil_id',
        'dia_semana',
        'hora_inicio',
        'hora_fin',
        'duracion_minima_minutos',
        'aviso_previo_horas',
        'observaciones',
    ];

    protected $casts = [
        'dia_semana' => 'integer',
        'duracion_minima_minutos' => 'integer',
        'aviso_previo_horas' => 'integer',
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
