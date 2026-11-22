import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const mensaje = error.response?.data?.message ?? 'No se pudo conectar con el servidor'
    return Promise.reject(new Error(mensaje))
  },
)

export default api