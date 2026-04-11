<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    protected $table = 'profiles';

    protected $fillable = [
            'dni',
            'fecha_nacimiento',
            'direccion',
            'ciudad',
            'codigo_postal',
            'area_ocupacional',
            'idiomas',
            'descripcion_personal',
            'tipo_cuidado',
            'experiencia',
            'certificaciones',
            'preferencias',
            'dni_frontal',
            'dni_trasera',
            'certificados',
            'descripcion_general_servicio',
        ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function direcciones()
    {
        return $this->hasMany(DireccionesPerfil::class, 'perfil_id');
    }

    public function cuidados()
    {
        return $this->hasMany(PerfilesCuidado::class, 'perfil_id');
    }

    public function disponibilidades()
    {
        return $this->hasMany(DisponibilidadPerfil::class, 'perfil_id');
    }

    public function servicios()
    {
        return $this->hasMany(ServicioPerfil::class, 'perfil_id');
    }

    public function getCompletionPercentage(): array
    {
        $role = $this->resolveProfileRole();

        if ($role === 'customer') {
            $fields = [
                'fecha_nacimiento',
                'direccion',
                'ciudad',
            ];

            $relations = [
                'cuidados' => fn () => $this->cuidados()->exists(),
                'direcciones' => fn () => $this->direcciones()->exists(),
            ];
        } else {
            $fields = [
                'fecha_nacimiento',
                'direccion',
                'ciudad',
                'descripcion_general_servicio',
            ];

            $relations = [
                'direcciones' => fn () => $this->direcciones()->exists(),
                'disponibilidades' => fn () => $this->disponibilidades()->exists(),
                'servicios' => fn () => $this->servicios()
                    ->whereNotNull('descripcion')
                    ->where('descripcion', '!=', '')
                    ->exists(),
            ];
        }

        $total = count($fields) + count($relations);
        $filled = 0;
        $missing = [];

        foreach ($fields as $field) {
            $value = $this->$field;

            if (filled($value)) {
                $filled++;
            } else {
                $missing[] = $field;
            }
        }

        foreach ($relations as $relation => $resolver) {
            if ($resolver()) {
                $filled++;
            } else {
                $missing[] = $relation;
            }
        }

        $percentage = (int) round(($filled / $total) * 100);
        return [
            'percentage' => $percentage,
            'missing' => $missing
        ];
    }

    private function resolveProfileRole(): string
    {
        $role = $this->user?->role;

        if (in_array($role, ['customer', 'carer'], true)) {
            return $role;
        }

        return $this->user?->specialty === 'Cliente' ? 'customer' : 'carer';
    }
}
