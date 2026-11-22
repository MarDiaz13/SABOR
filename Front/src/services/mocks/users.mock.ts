import type { Rol } from '../../store/interfaces/auth.interface'

export interface UsuarioMock {
  usuario: string
  contrasena: string
  nombre: string
  correo: string
  rol: Rol
}

export const USUARIOS_MOCK: UsuarioMock[] = [
  { usuario: 'admin01', contrasena: 'admin123', nombre: 'Laura Gómez', correo: 'laura.gomez@sabor.mx', rol: 'admin' },
  { usuario: 'mesero01', contrasena: 'mesero123', nombre: 'Carlos Ruiz', correo: 'carlos.ruiz@sabor.mx', rol: 'mesero' },
  { usuario: 'mesero02', contrasena: 'mesero123', nombre: 'Ana Torres', correo: 'ana.torres@sabor.mx', rol: 'mesero' },
  { usuario: 'cocina01', contrasena: 'cocina123', nombre: 'Jorge Méndez', correo: 'jorge.mendez@sabor.mx', rol: 'cocina' },
  { usuario: 'cajero01', contrasena: 'cajero123', nombre: 'Sofía Rivas', correo: 'sofia.rivas@sabor.mx', rol: 'cajero' },
]

// Código de verificación de prueba (el back real lo mandaría por correo)
export const CODIGO_MOCK = '123456'