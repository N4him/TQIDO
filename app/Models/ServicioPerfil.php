<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServicioPerfil extends Model
{
    protected $table = 'servicios_perfil';

    protected $fillable = [
        'perfil_id',
        'tipo',
        'precio',
        'precio_hora',
        'precio_oferta',
        'oferta_activa',
        'descripcion',
        'estado',
    ];

    protected $casts = [
        'precio' => 'decimal:2',
        'precio_hora' => 'decimal:2',
        'precio_oferta' => 'decimal:2',
        'oferta_activa' => 'boolean',
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'servicio_perfil_id');
    }
}
