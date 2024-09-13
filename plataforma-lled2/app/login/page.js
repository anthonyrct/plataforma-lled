'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Login.module.css';  // Importando o arquivo CSS

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Armazenar o token no localStorage
        localStorage.setItem('token', data.token);
        // Redirecionar para a página de cursos
        router.push('/cursos');
      } else {
        setError(data.message || 'Credenciais inválidas');
      }
    } catch (error) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="/login">Login</a>
          <a href="/register">Cadastro</a>
        </nav>
      </header>

      {/* Main Container */}
      <div className={styles.container}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 LLED - Plataforma Interna de Cursos</p>
      </footer>
    </>
  );
}
