import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import IconoOjo from '../../../shared/components/IconoOjo'
import { restablecerContrasenaService, solicitarCodigoService } from '../../../services/auth.service'
import './LoginPage.css'
import './RecuperarPage.css'

type Paso = 'correo' | 'codigo' | 'listo'

const esCorreoValido = (texto: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)

export default function RecuperarPage() {
  const [paso, setPaso] = useState<Paso>('correo')
  const [correo, setCorreo] = useState('')
  const [codigo, setCodigo] = useState('')
  const [nuevaContrasena, setNuevaContrasena] = useState('')
  const [confirmarContrasena, setConfirmarContrasena] = useState('')
  const [verContrasena, setVerContrasena] = useState(false)

  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  // Paso 1: manda el correo para que le llegue un código
  const solicitarCodigo = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!correo.trim()) return setError('Escribe tu correo electrónico')
    if (!esCorreoValido(correo.trim())) return setError('Escribe un correo válido, por ejemplo nombre@correo.com')

    setCargando(true)
    try {
      const respuesta = await solicitarCodigoService({ correo: correo.trim() })
      setMensaje(respuesta.mensaje)
      setPaso('codigo')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar el código')
    } finally {
      setCargando(false)
    }
  }

  // Paso 2: manda el código y la nueva contraseña
  const restablecerContrasena = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (codigo.length !== 6) return setError('El código debe tener 6 dígitos')
    if (nuevaContrasena.length < 8) return setError('La contraseña debe tener al menos 8 caracteres')
    if (nuevaContrasena !== confirmarContrasena) return setError('Las contraseñas no coinciden')

    setCargando(true)
    try {
      const respuesta = await restablecerContrasenaService({ correo: correo.trim(), codigo, nuevaContrasena })
      setMensaje(respuesta.mensaje)
      setPaso('listo')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cambiar la contraseña')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="login">
      <header className="login__marca">
        <div className="login__logo">S</div>
        <h1>SABOR</h1>
        <p className="login__sub">SISTEMA DE RESTAURANTE · POS</p>
      </header>

      {/* ---------- Paso 1: correo ---------- */}
      {paso === 'correo' && (
        <form className="login__tarjeta" onSubmit={solicitarCodigo} noValidate>
          <h2>Recuperar Contraseña</h2>
          <p className="login__meta">Escribe el correo de tu cuenta y te enviaremos un código para cambiar tu contraseña.</p>

          <label>CORREO ELECTRÓNICO</label>
          <input
            className="login__campo"
            type="email"
            placeholder="nombre@correo.com"
            autoComplete="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          {error && <p className="recuperar__error">{error}</p>}

          <button type="submit" className="login__boton" disabled={cargando}>
            {cargando ? 'Enviando...' : 'Enviar Código'}
          </button>
          <NavLink to="/" className="recuperar__enlace">← Volver a iniciar sesión</NavLink>
        </form>
      )}

      {/* ---------- Paso 2: código y nueva contraseña ---------- */}
      {paso === 'codigo' && (
        <form className="login__tarjeta" onSubmit={restablecerContrasena}>
          <h2>Nueva Contraseña</h2>
          <p className="recuperar__aviso">{mensaje}</p>

          <label>CÓDIGO DE VERIFICACIÓN</label>
          <input
            className="login__campo recuperar__codigo"
            placeholder="000000"
            inputMode="numeric"
            maxLength={6}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
          />

          <label>NUEVA CONTRASEÑA</label>
          <div className="login__clave">
            <input
              className="login__campo"
              type={verContrasena ? 'text' : 'password'}
              placeholder="Mínimo 8 caracteres"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
            />
            <button
              type="button"
              className="login__ojo"
              onClick={() => setVerContrasena(!verContrasena)}
              aria-label={verContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              <IconoOjo tachado={verContrasena} />
            </button>
          </div>

          <label>CONFIRMAR CONTRASEÑA</label>
          <input
            className="login__campo"
            type={verContrasena ? 'text' : 'password'}
            placeholder="Repite la contraseña"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
          />

          {error && <p className="recuperar__error">{error}</p>}

          <button type="submit" className="login__boton" disabled={cargando}>
            {cargando ? 'Guardando...' : 'Cambiar Contraseña'}
          </button>
          <button type="button" className="recuperar__enlace" onClick={() => setPaso('correo')}>
            ← Usar otro correo
          </button>
        </form>
      )}

      {paso === 'listo' && (
        <div className="login__tarjeta">
          <div className="recuperar__palomita">✓</div>
          <h2>¡Listo!</h2>
          <p className="login__meta">{mensaje}. Ya puedes iniciar sesión con tu nueva contraseña.</p>
          <NavLink to="/" className="login__boton recuperar__boton-enlace">Ir a Iniciar Sesión</NavLink>
        </div>
      )}

      <footer className="login__pie">SABOR POS · v2.4.1 · © 2026</footer>
    </div>
  )
}
