import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';

import styles from '../styles/pages/home.module.css';
import {FaChevronRight} from 'react-icons/fa'

export default function Home() {
  const { push } = useRouter();
  const [username, setUsername] = useState("")

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    username && push(`/${username}`);

  }, [username])

  return (
    <div className={styles.container}>
        <div className={styles.background}>
          <img src="simbolo.svg" alt="Simbolo"/>          
        </div>
     
      <section className={styles.section}>
        <img src="logo-white.svg" alt="Move It"/>

        <div className={styles.signIn} >
          <h1>Bem-vindo!</h1>
          <div className={styles.signInBox}>
            <img src="icons/github.svg" alt="Github"/>
            <p>Faça login com seu Github<br/>para começar</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={username}
              placeholder="Digite seu username"
              onChange={(e) => {
                setUsername(e.currentTarget.value)
              }}
            />
            <button type="submit"><FaChevronRight /></button>
          </form>
        </div>
      </section>
    </div>
  )
}