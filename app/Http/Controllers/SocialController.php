<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function redirect(Request $request, string $provider)
    {
        abort_unless($provider === 'google', 404);

        $role = $request->query('role');

        if (in_array($role, ['customer', 'carer'], true)) {
            $request->session()->put('social_auth_role', $role);
        } else {
            $request->session()->forget('social_auth_role');
        }

        return Socialite::driver($provider)->redirect();
    }

    public function callback(Request $request, string $provider)
    {
        abort_unless($provider === 'google', 404);

        $socialUser = Socialite::driver($provider)->stateless()->user();
        $intendedRole = $request->session()->pull('social_auth_role');
        Log::info('Usuario social obtenido:', ['provider' => $provider, 'social_user' => $socialUser]);

        if (! $socialUser->getEmail()) {
            return redirect()->route('login')->withErrors([
                'email' => 'No fue posible obtener el correo de tu cuenta de Google.',
            ]);
        }

        $user = User::where('provider', $provider)
            ->where('provider_id', $socialUser->getId())
            ->first();

        if (!$user) {
            $user = User::where('email', $socialUser->getEmail())->first();

            if ($user) {
                // Vincular cuenta social
                $attributes = [
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                ];

                if ($intendedRole && ! in_array($user->role, ['customer', 'carer'], true)) {
                    $attributes['role'] = $intendedRole;
                    $attributes['specialty'] = $intendedRole === 'customer' ? 'Cliente' : $user->specialty;
                }

                $user->update($attributes);
            } else {
                if (! $intendedRole) {
                    $request->session()->put('pending_social_auth', [
                        'provider' => $provider,
                        'provider_id' => $socialUser->getId(),
                        'email' => $socialUser->getEmail(),
                        'name' => $socialUser->getName(),
                    ]);

                    return redirect()->route('register', [
                        'social_signup' => 1,
                    ]);
                }

                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'role' => $intendedRole,
                    'specialty' => $intendedRole === 'customer' ? 'Cliente' : null,
                    'email_verified_at' => now(),
                    'password' => bcrypt(uniqid()),
                ]);
            }
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended($this->resolveProfileRedirect($user));
    }

    public function completeRegistration(Request $request, string $role)
    {
        abort_unless(in_array($role, ['customer', 'carer'], true), 404);

        $pendingSocialAuth = $request->session()->pull('pending_social_auth');

        if (! is_array($pendingSocialAuth)) {
            return redirect()->route('login')->withErrors([
                'email' => 'Tu sesiÃ³n de registro con Google expirÃ³. Intenta nuevamente.',
            ]);
        }

        $provider = $pendingSocialAuth['provider'] ?? null;
        $providerId = $pendingSocialAuth['provider_id'] ?? null;
        $email = $pendingSocialAuth['email'] ?? null;
        $name = $pendingSocialAuth['name'] ?? null;

        if (! $provider || ! $providerId || ! $email) {
            return redirect()->route('login')->withErrors([
                'email' => 'No pudimos completar el registro con Google. Intenta nuevamente.',
            ]);
        }

        $user = User::where('provider', $provider)
            ->where('provider_id', $providerId)
            ->first();

        if (! $user) {
            $user = User::where('email', $email)->first();

            if ($user) {
                $user->update([
                    'provider' => $provider,
                    'provider_id' => $providerId,
                    'role' => in_array($user->role, ['customer', 'carer'], true) ? $user->role : $role,
                    'specialty' => $role === 'customer' ? 'Cliente' : $user->specialty,
                    'email_verified_at' => $user->email_verified_at ?? now(),
                ]);
            } else {
                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'provider' => $provider,
                    'provider_id' => $providerId,
                    'role' => $role,
                    'specialty' => $role === 'customer' ? 'Cliente' : null,
                    'email_verified_at' => now(),
                    'password' => bcrypt(uniqid()),
                ]);
            }
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended($this->resolveProfileRedirect($user));
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
