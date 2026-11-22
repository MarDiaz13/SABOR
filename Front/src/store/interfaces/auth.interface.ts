export type Rol = 'admin' | 'mesero' | 'cocina' | 'cajero'

export interface LoginRequest {
  usuario: string
  contrasena: string
}

export interface LoginResponse {
  token: string
  nombre: string
  rol: Rol
}

// ---------- Recuperar contraseña ----------

export interface SolicitarCodigoRequest {
  correo: string
}

export interface SolicitarCodigoResponse {
  mensaje: string
}

export interface RestablecerContrasenaRequest {
  correo: string
  codigo: string
  nuevaContrasena: string
}

export interface RestablecerContrasenaResponse {
  mensaje: string
}