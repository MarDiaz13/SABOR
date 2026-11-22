import api from '../config/api/api.service'
import { ENDPOINTS } from '../config/api/endpoints'
import type { LoginRequest, LoginResponse } from '../store/interfaces/auth.interface'
import { USUARIOS_MOCK } from './mocks/users.mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const loginMock = async ({ usuario, contrasena }: LoginRequest): Promise<LoginResponse> => {
  await new Promise((r) => setTimeout(r, 600))
  const encontrado = USUARIOS_MOCK.find(
    (u) => u.usuario === usuario && u.contrasena === contrasena,
  )
  if (!encontrado) throw new Error('Usuario o contraseña incorrectos')
  return { token: `token-${encontrado.usuario}`, nombre: encontrado.nombre, rol: encontrado.rol }
}

export const loginService = async (data: LoginRequest) => {
  if (USE_MOCK) return loginMock(data)
  const response = await api.post<LoginResponse>(ENDPOINTS.login, data)
  return response.data
}