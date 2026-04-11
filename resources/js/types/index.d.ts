import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User | null;
}

export interface UserProfile {
    id?: number;
    user_id?: number;
    dni?: string | null;
    fecha_nacimiento?: string | null;
    direccion?: string | null;
    ciudad?: string | null;
    codigo_postal?: string | null;
    area_ocupacional?: string | null;
    idiomas?: string | null;
    descripcion_personal?: string | null;
    tipo_cuidado?: string | null;
    experiencia?: string | null;
    certificaciones?: string | null;
    preferencias?: string | null;
    dni_frontal?: string | null;
    dni_trasera?: string | null;
    certificados?: string | null;
    cuidados?: CareProfile[] | null;
    direcciones?: AddressProfile[] | null;
    disponibilidades?: AvailabilitySlot[] | null;
    servicios?: ProfileService[] | null;
    descripcion_general_servicio?: string | null;
}

export interface CareProfile {
    id?: number;
    perfil_id?: number;
    nombre?: string | null;
    rol?: string | null;
    especificacion?: string | null;
    edad?: string | null;
    movilidad?: string | null;
    medicacion?: string | null;
    alergias?: string | null;
    diagnostico?: string | null;
    contacto_emergencia?: string | null;
}

export interface AddressProfile {
    id?: number;
    perfil_id?: number;
    label?: string | null;
    address_line_1?: string | null;
    address_line_2?: string | null;
    neighborhood?: string | null;
    reference?: string | null;
    is_default?: boolean;
    type?: string | null;
}

export interface AvailabilitySlot {
    id?: number;
    perfil_id?: number;
    dia_semana?: number | null;
    hora_inicio?: string | null;
    hora_fin?: string | null;
    duracion_minima_minutos?: number | null;
    aviso_previo_horas?: number | null;
    observaciones?: string | null;
}

export interface ProfileService {
    id?: number;
    perfil_id?: number;
    tipo?: string | null;
    descripcion?: string | null;
}

export interface ProfileCompletion {
    percentage: number;
    missing: string[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    role?: string | null;
    specialty?: string | null;
    avatar?: string;
    profile?: UserProfile | null;
    profile_completion?: ProfileCompletion | null;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
