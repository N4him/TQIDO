<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reserva extends Model
{
    public const ESTADO_PENDIENTE = 'pendiente';
    public const ESTADO_ACEPTADA = 'aceptada';
    public const ESTADO_RECHAZADA = 'rechazada';
    public const ESTADO_CANCELADA = 'cancelada';
    public const ESTADO_EN_CURSO = 'en_curso';
    public const ESTADO_COMPLETADA = 'completada';

    protected $table = 'reservas';

    protected $fillable = [
        'customer_user_id',
        'carer_user_id',
        'carer_profile_id',
        'servicio_perfil_id',
        'fecha_servicio',
        'hora_inicio',
        'hora_fin',
        'duracion_minutos',
        'direccion_servicio',
        'notas',
        'precio_hora',
        'precio_total',
        'estado',
        'respondida_en',
        'cancelada_en',
        'iniciada_en',
        'completada_en',
        'motivo_rechazo',
        'motivo_cancelacion',
    ];

    protected $casts = [
        'fecha_servicio' => 'date',
        'duracion_minutos' => 'integer',
        'precio_hora' => 'decimal:2',
        'precio_total' => 'decimal:2',
        'respondida_en' => 'datetime',
        'cancelada_en' => 'datetime',
        'iniciada_en' => 'datetime',
        'completada_en' => 'datetime',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_user_id');
    }

    public function carer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'carer_user_id');
    }

    public function carerProfile(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'carer_profile_id');
    }

    public function servicio(): BelongsTo
    {
        return $this->belongsTo(ServicioPerfil::class, 'servicio_perfil_id');
    }
}
