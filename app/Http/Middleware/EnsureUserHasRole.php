<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        $resolvedRole = $user->role;

        if (! in_array($resolvedRole, ['carer', 'customer'], true)) {
            $resolvedRole = $user->specialty === 'Cliente' ? 'customer' : 'carer';
        }

        if ($resolvedRole !== $role) {
            return redirect()->route(
                $resolvedRole === 'customer'
                    ? 'profile.customer.preview'
                    : 'profile.carer.preview'
            );
        }

        return $next($request);
    }
}
