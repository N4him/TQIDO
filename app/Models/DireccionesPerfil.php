<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DireccionesPerfil extends Model
{
    protected $table = 'direcciones_perfil';

    protected $fillable = [
        'perfil_id',
        'label',
        'address_line_1',
        'address_line_2',
        'neighborhood',
        'reference',
        'is_default',
        'type',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];
   
    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
