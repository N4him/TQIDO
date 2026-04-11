<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerfilesCuidado extends Model
{
    protected $table = 'perfiles_cuidado_perfil';

    protected $fillable = [
        'perfil_id',
        'nombre',
        'rol',
        'especificacion',
        'edad',
        'movilidad',
        'medicacion',
        'alergias',
        'diagnostico',
        'contacto_emergencia',
    ];
   
    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
