import type { Rol } from '../../store/interfaces/auth.interface'

export interface UsuarioMock {
  usuario: string
  contrasena: string
  nombre: string
  rol: Rol
}

export const USUARIOS_MOCK: UsuarioMock[] = [
  { usuario: 'admin01', contrasena: 'admin123', nombre: 'Laura Gómez', rol: 'admin' },
  { usuario: 'mesero01', contrasena: 'mesero123', nombre: 'Carlos Ruiz', rol: 'mesero' },
  { usuario: 'mesero02', contrasena: 'mesero123', nombre: 'Ana Torres', rol: 'mesero' },
  { usuario: 'cocina01', contrasena: 'cocina123', nombre: 'Jorge Méndez', rol: 'cocina' },
  { usuario: 'cajero01', contrasena: 'cajero123', nombre: 'Sofía Rivas', rol: 'cajero' },
]