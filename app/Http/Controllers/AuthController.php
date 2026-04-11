<?php

namespace App\Http\Controllers;

use App\Models\DireccionesPerfil;
use App\Models\DisponibilidadPerfil;
use App\Models\PerfilesCuidado;
use App\Models\ServicioPerfil;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function webLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['nullable', 'boolean'],
        ], [
            'email.required' => 'El correo electronico es obligatorio.',
            'email.email' => 'El correo electronico debe ser una direccion valida.',
            'password.required' => 'La contrasena es obligatoria.',
        ]);

        if (! Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ], $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => 'Las credenciales proporcionadas no son correctas.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended($this->resolveProfileRedirect(Auth::user()));
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ], [
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'password.required' => 'La contraseña es obligatoria.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Datos inválidos.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Credenciales incorrectas.',
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Inicio de sesión exitoso.',
            'user' => $user,
            'redirect_url' => $this->resolveProfileRedirect($user),
        ], 200);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['required', 'string', 'max:20', 'regex:/^\\+?[0-9\\s\\-()]{7,20}$/'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'terms' => ['accepted'],
            'privacy' => ['accepted'],
            'specialty' => ['required', 'string', 'max:255'],
        ], [
            'name.required' => 'El nombre completo es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'email.unique' => 'El correo electrónico ya está registrado.',
            'phone.required' => 'El teléfono es obligatorio.',
            'phone.regex' => 'El teléfono debe tener un formato válido.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.letters' => 'La contraseña debe contener al menos una letra.',
            'password.mixed' => 'La contraseña debe contener letras mayúsculas y minúsculas.',
            'password.numbers' => 'La contraseña debe contener al menos un número.',
            'password.symbols' => 'La contraseña debe contener al menos un símbolo.',
            'password.uncompromised' => 'La contraseña ha sido comprometida en una filtración de datos. Por favor, elige otra diferente.',
            'terms.accepted' => 'Debes aceptar los términos y condiciones.',
            'privacy.accepted' => 'Debes aceptar la política de privacidad.',
            'specialty.required' => 'La especialidad es obligatoria.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Datos inválidos.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
            'specialty' => $request->specialty,
            'role' => $this->resolveRoleFromRequest($request->input('role'), $request->specialty),
            'terms' => $request->boolean('terms'),
            'privacy' => $request->boolean('privacy'),
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'status' => 'success',
            'message' => 'Usuario registrado correctamente.',
            'user' => $user,
            'redirect_url' => $this->resolveProfileRedirect($user),
        ], 201);
    }

    public function createProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required', 'exists:users,id'],
            'dni' => ['nullable', 'string', 'max:20'],
            'fecha_nacimiento' => ['nullable', 'date'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'ciudad' => ['nullable', 'string', 'max:100'],
            'codigo_postal' => ['nullable', 'string', 'max:20'],
            'area_ocupacional' => ['nullable', 'string', 'max:255'],
            'idiomas' => ['nullable', 'string', 'max:255'],
            'descripcion_personal' => ['nullable', 'string'],
            'tipo_cuidado' => ['nullable', 'string', 'max:255'],
            'experiencia' => ['nullable', 'string', 'max:255'],
            'certificaciones' => ['nullable', 'string', 'max:255'],
            'preferencias' => ['nullable', 'string', 'max:255'],
            'dni_frontal' => ['nullable', 'string', 'max:255'],
            'dni_trasera' => ['nullable', 'string', 'max:255'],
            'certificados' => ['nullable', 'string', 'max:255'],
        ], [
            'user_id.required' => 'El ID de usuario es obligatorio.',
            'user_id.exists' => 'El ID de usuario no existe.',
            'dni.string' => 'El DNI debe ser una cadena de texto.',
            'dni.max' => 'El DNI no puede tener más de 20 caracteres.',
            'fecha_nacimiento.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'direccion.string' => 'La dirección debe ser una cadena de texto.',
            'direccion.max' => 'La dirección no puede tener más de 255 caracteres.',
            'ciudad.string' => 'La ciudad debe ser una cadena de texto.',
            'ciudad.max' => 'La ciudad no puede tener más de 100 caracteres.',
            'codigo_postal.string' => 'El código postal debe ser una cadena de texto.',
            'codigo_postal.max' => 'El código postal no puede tener más de 20 caracteres.',
            'area_ocupacional.string' => 'El área ocupacional debe ser una cadena de texto.',
            'area_ocupacional.max' => 'El área ocupacional no puede tener más de 255 caracteres.',
            'idiomas.string' => 'Los idiomas deben ser una cadena de texto.',
            'idiomas.max' => 'Los idiomas no pueden tener más de 255 caracteres.',
            'descripcion_personal.string' => 'La descripción personal debe ser una cadena de texto.',
            'tipo_cuidado.string' => 'El tipo de cuidado debe ser una cadena de texto.',
            'tipo_cuidado.max' => 'El tipo de cuidado no puede tener más de 255 caracteres.',
            'experiencia.string' => 'La experiencia debe ser una cadena de texto.',
            'experiencia.max' => 'La experiencia no puede tener más de 255 caracteres.',
            'certificaciones.string' => 'Las certificaciones deben ser una cadena de texto.',
            'certificaciones.max' => 'Las certificaciones no pueden tener más de 255 caracteres.',
            'preferencias.string' => 'Las preferencias deben ser una cadena de texto.',
            'preferencias.max' => 'Las preferencias no pueden tener más de 255 caracteres.',
            'dni_frontal.string' => 'El DNI frontal debe ser una cadena de texto.',
            'dni_frontal.max' => 'El DNI frontal no puede tener más de 255 caracteres.',
            'dni_trasera.string' => 'El DNI trasera debe ser una cadena de texto.',
            'dni_trasera.max' => 'El DNI trasera no puede tener más de 255 caracteres.',
            'certificados.string' => 'Los certificados deben ser una cadena de texto.',
            'certificados.max' => 'Los certificados no pueden tener más de 255 caracteres.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Datos inválidos.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = User::findOrFail($request->user_id);

            $user->profile()->create([
                'dni' => $request->dni,
                'fecha_nacimiento' => $request->fecha_nacimiento,
                'direccion' => $request->direccion,
                'ciudad' => $request->ciudad,
                'codigo_postal' => $request->codigo_postal,
                'area_ocupacional' => $request->area_ocupacional,
                'idiomas' => $request->idiomas,
                'descripcion_personal' => $request->descripcion_personal,
                'tipo_cuidado' => $request->tipo_cuidado,
                'experiencia' => $request->experiencia,
                'certificaciones' => $request->certificaciones,
                'preferencias' => $request->preferencias,
                'dni_frontal' => $request->dni_frontal,
                'dni_trasera' => $request->dni_trasera,
                'certificados' => $request->certificados,
            ]);

            $profile = $user->profile()->with('cuidados', 'direcciones', 'disponibilidades', 'servicios')->first();

            return response()->json([
                'message' => 'Perfil creado correctamente.',
                'profile' => $profile,
                'profile_completion' => $profile?->getCompletionPercentage(),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al crear el perfil.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required', 'exists:users,id'],
            'dni' => ['nullable', 'string', 'max:20'],
            'fecha_nacimiento' => ['nullable', 'date'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'ciudad' => ['nullable', 'string', 'max:100'],
            'codigo_postal' => ['nullable', 'string', 'max:20'],
            'area_ocupacional' => ['nullable', 'string', 'max:255'],
            'idiomas' => ['nullable', 'string', 'max:255'],
            'descripcion_personal' => ['nullable', 'string'],
            'tipo_cuidado' => ['nullable', 'string', 'max:255'],
            'experiencia' => ['nullable', 'string', 'max:255'],
            'certificaciones' => ['nullable', 'string', 'max:255'],
            'preferencias' => ['nullable', 'string', 'max:255'],
            'dni_frontal' => ['nullable', 'string', 'max:255'],
            'dni_trasera' => ['nullable', 'string', 'max:255'],
            'certificados' => ['nullable', 'string', 'max:255'],
            'descripcion_general_servicio' => ['nullable', 'string'],
            'care_profiles' => ['nullable', 'array'],
            'care_profiles.*.id' => ['nullable', 'integer'],
            'care_profiles.*.nombre' => ['required', 'string', 'max:255'],
            'care_profiles.*.rol' => ['nullable', 'string', 'max:255'],
            'care_profiles.*.especificacion' => ['nullable', 'string', 'max:255'],
            'care_profiles.*.edad' => ['nullable', 'string', 'max:255'],
            'care_profiles.*.movilidad' => ['nullable', 'string', 'max:255'],
            'care_profiles.*.medicacion' => ['nullable', 'string', 'max:255'],
            'care_profiles.*.alergias' => ['nullable', 'string', 'max:255'],
            'care_profiles.*.diagnostico' => ['nullable', 'string', 'max:255'],
            'care_profiles.*.contacto_emergencia' => ['nullable', 'string', 'max:255'],
            'addresses' => ['nullable', 'array'],
            'addresses.*.id' => ['nullable', 'integer'],
            'addresses.*.label' => ['required', 'string', 'max:255'],
            'addresses.*.address_line_1' => ['required', 'string', 'max:255'],
            'addresses.*.address_line_2' => ['nullable', 'string', 'max:255'],
            'addresses.*.neighborhood' => ['nullable', 'string', 'max:255'],
            'addresses.*.reference' => ['nullable', 'string', 'max:255'],
            'addresses.*.type' => ['nullable', 'string', 'max:255'],
            'addresses.*.is_default' => ['nullable', 'boolean'],
            'availability_slots' => ['nullable', 'array'],
            'availability_slots.*.id' => ['nullable', 'integer'],
            'availability_slots.*.dia_semana' => ['required', 'integer', 'between:1,7'],
            'availability_slots.*.hora_inicio' => ['required', 'date_format:H:i'],
            'availability_slots.*.hora_fin' => ['required', 'date_format:H:i'],
            'availability_slots.*.duracion_minima_minutos' => ['nullable', 'integer', 'min:1'],
            'availability_slots.*.aviso_previo_horas' => ['nullable', 'integer', 'min:0'],
            'availability_slots.*.observaciones' => ['nullable', 'string', 'max:255'],
            'services' => ['nullable', 'array', 'max:3'],
            'services.*.id' => ['nullable', 'integer'],
            'services.*.tipo' => ['required', 'string', 'in:adultos_mayores,ninos,mascotas'],
            'services.*.descripcion' => ['nullable', 'string'],
        ], [
            'user_id.required' => 'El ID de usuario es obligatorio.',
            'user_id.exists' => 'El ID de usuario no existe.',
            'dni.string' => 'El DNI debe ser una cadena de texto.',
            'dni.max' => 'El DNI no puede tener más de 20 caracteres.',
            'fecha_nacimiento.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'direccion.string' => 'La dirección debe ser una cadena de texto.',
            'direccion.max' => 'La dirección no puede tener más de 255 caracteres.',
            'ciudad.string' => 'La ciudad debe ser una cadena de texto.',
            'ciudad.max' => 'La ciudad no puede tener más de 100 caracteres.',
            'codigo_postal.string' => 'El código postal debe ser una cadena de texto.',
            'codigo_postal.max' => 'El código postal no puede tener más de 20 caracteres.',
            'area_ocupacional.string' => 'El área ocupacional debe ser una cadena de texto.',
            'area_ocupacional.max' => 'El área ocupacional no puede tener más de 255 caracteres.',
            'idiomas.string' => 'Los idiomas deben ser una cadena de texto.',
            'idiomas.max' => 'Los idiomas no pueden tener más de 255 caracteres.',
            'descripcion_personal.string' => 'La descripción personal debe ser una cadena de texto.',
            'tipo_cuidado.string' => 'El tipo de cuidado debe ser una cadena de texto.',
            'tipo_cuidado.max' => 'El tipo de cuidado no puede tener más de 255 caracteres.',
            'experiencia.string' => 'La experiencia debe ser una cadena de texto.',
            'experiencia.max' => 'La experiencia no puede tener más de 255 caracteres.',
            'certificaciones.string' => 'Las certificaciones deben ser una cadena de texto.',
            'certificaciones.max' => 'Las certificaciones no pueden tener más de 255 caracteres.',
            'preferencias.string' => 'Las preferencias deben ser una cadena de texto.',
            'preferencias.max' => 'Las preferencias no pueden tener más de 255 caracteres.',
            'dni_frontal.string' => 'El DNI frontal debe ser una cadena de texto.',
            'dni_frontal.max' => 'El DNI frontal no puede tener más de 255 caracteres.',
            'dni_trasera.string' => 'El DNI trasera debe ser una cadena de texto.',
            'dni_trasera.max' => 'El DNI trasera no puede tener más de 255 caracteres.',
            'certificados.string' => 'Los certificados deben ser una cadena de texto.',
            'certificados.max' => 'Los certificados no pueden tener más de 255 caracteres.',
            'care_profiles.*.nombre.required' => 'Cada perfil de cuidado debe tener un nombre.',
            'addresses.*.label.required' => 'Cada direccion debe tener una etiqueta.',
            'addresses.*.address_line_1.required' => 'Cada direccion debe tener una direccion principal.',
            'availability_slots.*.dia_semana.required' => 'Cada bloque de disponibilidad debe tener un dia.',
            'availability_slots.*.hora_inicio.required' => 'Cada bloque de disponibilidad debe tener hora de inicio.',
            'availability_slots.*.hora_fin.required' => 'Cada bloque de disponibilidad debe tener hora de fin.',
            'services.max' => 'Solo puedes registrar hasta 3 servicios.',
            'services.*.tipo.required' => 'Cada servicio debe tener un tipo.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Datos inválidos.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $profile = DB::transaction(function () use ($request) {
                $user = User::findOrFail($request->user_id);
                $profile = $user->profile()->firstOrCreate([]);

                $profile->update([
                    'dni' => $request->dni,
                    'fecha_nacimiento' => $request->fecha_nacimiento,
                    'direccion' => $request->direccion,
                    'ciudad' => $request->ciudad,
                    'codigo_postal' => $request->codigo_postal,
                    'area_ocupacional' => $request->area_ocupacional,
                    'idiomas' => $request->idiomas,
                    'descripcion_personal' => $request->descripcion_personal,
                    'tipo_cuidado' => $request->tipo_cuidado,
                    'experiencia' => $request->experiencia,
                    'certificaciones' => $request->certificaciones,
                    'preferencias' => $request->preferencias,
                    'dni_frontal' => $request->dni_frontal,
                    'dni_trasera' => $request->dni_trasera,
                    'certificados' => $request->certificados,
                    'descripcion_general_servicio' => $request->descripcion_general_servicio,
                ]);

                $careProfiles = collect($request->input('care_profiles', []));
                $careIdsToDelete = $profile->cuidados()->pluck('id')->diff($careProfiles->pluck('id')->filter());

                if ($careIdsToDelete->isNotEmpty()) {
                    PerfilesCuidado::whereIn('id', $careIdsToDelete)->delete();
                }

                foreach ($careProfiles as $careProfile) {
                    $careId = $careProfile['id'] ?? null;
                    $payload = [
                        'nombre' => $careProfile['nombre'] ?? null,
                        'rol' => $careProfile['rol'] ?? null,
                        'especificacion' => $careProfile['especificacion'] ?? null,
                        'edad' => $careProfile['edad'] ?? null,
                        'movilidad' => $careProfile['movilidad'] ?? null,
                        'medicacion' => $careProfile['medicacion'] ?? null,
                        'alergias' => $careProfile['alergias'] ?? null,
                        'diagnostico' => $careProfile['diagnostico'] ?? null,
                        'contacto_emergencia' => $careProfile['contacto_emergencia'] ?? null,
                    ];

                    if ($careId) {
                        $profile->cuidados()->where('id', $careId)->update($payload);
                    } else {
                        $profile->cuidados()->create($payload);
                    }
                }

                $addresses = collect($request->input('addresses', []))->values();

                if ($addresses->isNotEmpty() && ! $addresses->contains(fn ($address) => ! empty($address['is_default']))) {
                    $addresses[0] = [
                        ...$addresses[0],
                        'is_default' => true,
                    ];
                }

                if ($addresses->where(fn ($address) => ! empty($address['is_default']))->count() > 1) {
                    $defaultIndex = $addresses->search(fn ($address) => ! empty($address['is_default']));
                    $addresses = $addresses->map(function ($address, $index) use ($defaultIndex) {
                        $address['is_default'] = $index === $defaultIndex;

                        return $address;
                    });
                }

                $addressIdsToDelete = $profile->direcciones()->pluck('id')->diff($addresses->pluck('id')->filter());

                if ($addressIdsToDelete->isNotEmpty()) {
                    DireccionesPerfil::whereIn('id', $addressIdsToDelete)->delete();
                }

                foreach ($addresses as $address) {
                    $addressId = $address['id'] ?? null;
                    $payload = [
                        'label' => $address['label'] ?? null,
                        'address_line_1' => $address['address_line_1'] ?? null,
                        'address_line_2' => $address['address_line_2'] ?? null,
                        'neighborhood' => $address['neighborhood'] ?? null,
                        'reference' => $address['reference'] ?? null,
                        'type' => $address['type'] ?? 'home',
                        'is_default' => ! empty($address['is_default']),
                    ];

                    if ($addressId) {
                        $profile->direcciones()->where('id', $addressId)->update($payload);
                    } else {
                        $profile->direcciones()->create($payload);
                    }
                }

                $availabilitySlots = collect($request->input('availability_slots', []));
                $availabilityIdsToDelete = $profile->disponibilidades()->pluck('id')->diff($availabilitySlots->pluck('id')->filter());

                if ($availabilityIdsToDelete->isNotEmpty()) {
                    DisponibilidadPerfil::whereIn('id', $availabilityIdsToDelete)->delete();
                }

                foreach ($availabilitySlots as $slot) {
                    $slotId = $slot['id'] ?? null;
                    $payload = [
                        'dia_semana' => $slot['dia_semana'] ?? null,
                        'hora_inicio' => $slot['hora_inicio'] ?? null,
                        'hora_fin' => $slot['hora_fin'] ?? null,
                        'duracion_minima_minutos' => $slot['duracion_minima_minutos'] ?? null,
                        'aviso_previo_horas' => $slot['aviso_previo_horas'] ?? null,
                        'observaciones' => $slot['observaciones'] ?? null,
                    ];

                    if ($slotId) {
                        $profile->disponibilidades()->where('id', $slotId)->update($payload);
                    } else {
                        $profile->disponibilidades()->create($payload);
                    }
                }

                $services = collect($request->input('services', []))->unique('tipo')->values();
                $serviceIdsToDelete = $profile->servicios()->pluck('id')->diff($services->pluck('id')->filter());

                if ($serviceIdsToDelete->isNotEmpty()) {
                    ServicioPerfil::whereIn('id', $serviceIdsToDelete)->delete();
                }

                foreach ($services as $service) {
                    $serviceId = $service['id'] ?? null;
                    $payload = [
                        'tipo' => $service['tipo'] ?? null,
                        'descripcion' => $service['descripcion'] ?? null,
                    ];

                    if ($serviceId) {
                        $profile->servicios()->where('id', $serviceId)->update($payload);
                    } else {
                        $profile->servicios()->updateOrCreate(
                            ['tipo' => $payload['tipo']],
                            $payload
                        );
                    }
                }

                return $profile->load('cuidados', 'direcciones', 'disponibilidades', 'servicios');
            });

            return response()->json([
                'message' => 'Perfil actualizado correctamente.',
                'profile' => $profile,
                'profile_completion' => $profile->getCompletionPercentage(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al actualizar el perfil.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        // Revocar el token actual del usuario autenticado
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente.',
        ], 200);
    }
    private function resolveRoleFromRequest(?string $role, ?string $specialty): string
    {
        if (in_array($role, ['carer', 'customer'], true)) {
            return $role;
        }

        return $specialty === 'Cliente' ? 'customer' : 'carer';
    }

    private function resolveProfileRedirect(User $user): string
    {
        $role = $user->role;

        if (! in_array($role, ['carer', 'customer'], true)) {
            $role = $user->specialty === 'Cliente' ? 'customer' : 'carer';
        }

        return $role === 'customer'
            ? route('profile.customer.preview')
            : route('profile.carer.preview');
    }
}
