'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Register.module.css';  // Importando o arquivo CSS

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('funcionario');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, tipo }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.message || 'Erro ao registrar');
      }
    } catch (error) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Plataforma de Cursos Interna - LLED</h1>
        <nav className={styles.nav}>
          <a href="/login" className={styles.link}>Login</a>
          <a href="/register" className={styles.link}>Cadastro</a>
        </nav>
      </header>

      {/* Main Container */}
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <img src="../assets/img/logo.png" alt="img" className={styles.image} />
          <div className={styles.formWrapper}>
            <h1 className={styles.title}>Registrar Usuário</h1>
            <form onSubmit={handleRegister} className={styles.form}>
              {error && <p className={styles.error}>{error}</p>}
              {success && <p className={styles.success}>{success}</p>}
              <img src="../assests/img/logo" alt="Logo" className={styles.logo} />
              <input
                className={styles.input}
                type="text"
                placeholder="Nome Usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="email"
                placeholder="Email Usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <select
                className={styles.select}
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <option value="funcionario">Funcionário</option>
                <option value="gerente">Gerente</option>
                <option value="administrador">Administrador</option>
              </select>
              <button type="submit" className={styles.button}>Registrar</button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 LLED - Plataforma Interna de Cursos</p>
        <nav className={styles.nav}>
          <a href="/login" className={styles.link}>Login</a>
          <a href="/register" className={styles.link}>Cadastro</a>
        </nav>
      </footer>
    </>
  );
}
