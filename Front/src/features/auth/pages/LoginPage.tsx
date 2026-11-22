import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import IconoOjo from '../../../shared/components/IconoOjo'
import './LoginPage.css'

export default function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [verContrasena, setVerContrasena] = useState(false)

  const iniciarSesion = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ usuario, contrasena })
  }

  return (
    <div className="login">
      <header className="login__marca">
        <div className="login__logo">S</div>
        <h1>SABOR</h1>
        <p className="login__sub">SISTEMA DE RESTAURANTE · POS</p>
      </header>

      <form className="login__tarjeta" onSubmit={iniciarSesion}>
        <h2>Acceso al Sistema</h2>
        <p className="login__meta">Sucursal: Centro Histórico · Turno Matutino</p>

        <label>IDENTIFICADOR DE USUARIO</label>
        <input
          className="login__campo"
          placeholder="Ingresa tu identificador"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <label>CONTRASEÑA</label>
        <div className="login__clave">
          <input
            className="login__campo"
            type={verContrasena ? 'text' : 'password'}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
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

        <NavLink to="/recuperar" className="login__olvide">¿Olvidaste tu contraseña?</NavLink>

        <button type="submit" className="login__boton">Iniciar Sesión</button>
      </form>

      <footer className="login__pie">SABOR POS · v2.4.1 · © 2026</footer>
    </div>
  )
}
