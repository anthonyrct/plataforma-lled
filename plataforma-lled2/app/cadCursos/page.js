'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/CadCursos.module.css';  // Importando o arquivo CSS

export default function CadCursos() {
  const [title, setTitle] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/cadcurso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, descricao, preco }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Curso cadastrado com sucesso!');
        setTimeout(() => {
          router.push('/cursos'); // Redireciona para a página de listagem de cursos
        }, 2000); // Redireciona após 2 segundos para mostrar a mensagem de sucesso
      } else {
        setError(data.message || 'Erro ao cadastrar curso');
      }
    } catch (error) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/img/logo.png" alt="Logo" className={styles.logo} />
        <h1>Cadastrar Curso</h1>
        <nav className={styles.nav}>
          <a href="/login">Login</a>
          <a href="/register">Cadastro</a>
        </nav>
      </header>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <input
          type="text"
          placeholder="Título do Curso"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
}
