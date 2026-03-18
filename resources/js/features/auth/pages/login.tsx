import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import "../../../css/auth/login.css";
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('api/login');
    };

    return (
        <div className="lp-root">

            {/* ══ LEFT PANEL ══ */}
            <div className="lp-left">
                <div className="lp-left-img" />
                <div className="lp-left-overlay" />
                <div className="lp-left-watermark">TQido</div>
                <div className="lp-left-heading">
                    <h1 className="lp-heading">
                        Cuidado que<br /><em>transforma</em><br />vidas
                    </h1>
                </div>
            </div>

            {/* ══ RIGHT PANEL ══ */}
            <div className="lp-right">
                <div className="lp-form-wrap">

                    {/* Logo */}
                    <a href="/" className="lp-form-logo">
                        <img src="/assets/Logo SPLIT.png" alt="TQido" />
                    </a>

                    {/* Header */}
                    <div className="lp-form-header">
                        <h1 className="lp-form-title">Bienvenido de <em>vuelta</em></h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="lp-fields">

                            {/* Email */}
                            <div>
                                <div className={`lp-field${focusedField === 'email' ? ' focused' : ''}${errors.email ? ' error' : ''}`}>
                                    <div className="lp-field-inner">
                                        <label className="lp-label" htmlFor="lp-email">Correo electrónico</label>
                                        <input
                                            id="lp-email" type="email" className="lp-input"
                                            placeholder="tu@email.com"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            autoComplete="email"
                                        />
                                    </div>
                                    <span className="lp-field-icon" style={{ pointerEvents: 'none' }}>
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                    </span>
                                </div>
                                {errors.email && (
                                    <p className="lp-err">
                                        <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                        </svg>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div className={`lp-field${focusedField === 'password' ? ' focused' : ''}${errors.password ? ' error' : ''}`}>
                                    <div className="lp-field-inner">
                                        <label className="lp-label" htmlFor="lp-password">Contraseña</label>
                                        <input
                                            id="lp-password"
                                            type={showPassword ? 'text' : 'password'}
                                            className="lp-input"
                                            placeholder="Mínimo 8 caracteres"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField(null)}
                                            autoComplete="current-password"
                                        />
                                    </div>
                                    <button
                                        type="button" className="lp-field-icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                    >
                                        {showPassword ? (
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="lp-err">
                                        <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                        </svg>
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Remember + forgot */}
                        <div className="lp-extras">
                            <label className="lp-check-wrap">
                                <input
                                    type="checkbox" className="lp-checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                />
                                <span className="lp-check-text">Recordarme</span>
                            </label>
                            <Link href="/forgot-password" className="lp-forgot">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="lp-submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                                        className="lp-spin">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                    </svg>
                                    Ingresando...
                                </>
                            ) : (
                                <>
                                    Ingresar a TQido
                                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                    </svg>
                                </>
                            )}
                        </button>

                        {/* OR */}
                        <div className="lp-or"><span>o entra con</span></div>

                        {/* Google */}
                        <a href="/auth/google" className="lp-google-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continuar con Google
                        </a>
                    </form>

                    <p className="lp-register">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register">Regístrate gratis →</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}