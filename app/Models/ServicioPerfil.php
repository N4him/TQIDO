<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServicioPerfil extends Model
{
    protected $table = 'servicios_perfil';

    protected $fillable = [
        'perfil_id',
        'tipo',
        'descripcion',
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
