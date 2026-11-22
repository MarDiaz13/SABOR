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