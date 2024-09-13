'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/Dashboard.module.css';  // Importando o arquivo CSS

export default function Dashboard() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
      <img src="/img/logo.png" alt="Logo" className={styles.logo} />
        <h1>Dashboard</h1>
        <nav className={styles.nav}>
          <a href="/login">Login</a>
          <a href="/register">Cadastro</a>
        </nav>
      </header>
      <div className={styles.container}>
        <div className={styles.section} onClick={() => handleNavigate('/cadCursos')}>
          <h2>Cadastrar Cursos</h2>
        </div>

        <div className={styles.section} onClick={() => handleNavigate('/gerenciar-usuarios')}>
          <h2>Gerenciar Usuários</h2>
        </div>
      </div>
    </div>
  );
}
