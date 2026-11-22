import api from '../config/api/api.service'
import { ENDPOINTS } from '../config/api/endpoints'
import type {
  LoginRequest,
  LoginResponse,
  RestablecerContrasenaRequest,
  RestablecerContrasenaResponse,
  SolicitarCodigoRequest,
  SolicitarCodigoResponse,
} from '../store/interfaces/auth.interface'
import { CODIGO_MOCK, USUARIOS_MOCK } from './mocks/users.mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const esperar = () => new Promise((r) => setTimeout(r, 600))

const buscarPorCorreo = (correo: string) =>
  USUARIOS_MOCK.find((u) => u.correo.toLowerCase() === correo.trim().toLowerCase())


const loginMock = async ({ usuario, contrasena }: LoginRequest): Promise<LoginResponse> => {
  await esperar()
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

// ---------- Recuperar contraseña: paso 1 (pedir código) ----------

const solicitarCodigoMock = async ({ correo }: SolicitarCodigoRequest): Promise<SolicitarCodigoResponse> => {
  await esperar()
  const encontrado = buscarPorCorreo(correo)
  if (!encontrado) throw new Error('No existe una cuenta con ese correo')
  return { mensaje: `Enviamos un código de 6 dígitos a ${encontrado.correo}` }
}

export const solicitarCodigoService = async (data: SolicitarCodigoRequest) => {
  if (USE_MOCK) return solicitarCodigoMock(data)
  const response = await api.post<SolicitarCodigoResponse>(ENDPOINTS.solicitarCodigo, data)
  return response.data
}

// ---------- Recuperar contraseña: paso 2 (nueva contraseña) ----------

const restablecerContrasenaMock = async ({
  correo,
  codigo,
  nuevaContrasena,
}: RestablecerContrasenaRequest): Promise<RestablecerContrasenaResponse> => {
  await esperar()
  const encontrado = buscarPorCorreo(correo)
  if (!encontrado || codigo !== CODIGO_MOCK) throw new Error('El código no es válido')
  encontrado.contrasena = nuevaContrasena
  return { mensaje: 'Tu contraseña se actualizó correctamente' }
}

export const restablecerContrasenaService = async (data: RestablecerContrasenaRequest) => {
  if (USE_MOCK) return restablecerContrasenaMock(data)
  const response = await api.post<RestablecerContrasenaResponse>(ENDPOINTS.restablecerContrasena, data)
  return response.data
}