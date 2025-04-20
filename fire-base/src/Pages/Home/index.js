import { useState } from "react"
import './home.css'

import { Link } from 'react-router-dom'

import {auth} from '../../firebaseConnection'
import {signInWithEmailAndPassword} from 'firebase/auth'

import { useNavigate } from "react-router-dom"

export default function Home(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password!== ''){
      alert("TESTE")

      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', { replace: true })
      })

      .catch(() => {
        console.log("ERRO AO FAZER LOGIN")
      })

    }else{
      alert("Preencha todos os campos!")
    }

    alert("teste")
  }

    return(
      <div className="home-container">
        <h1>Lista de tarefas</h1>
        <span>Gerencie sua agenda de forma facil!</span>

        <form className="form" onSubmit={handleLogin}>
          <input 
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
          
          <input 
          autoComplete={false}
          type="text"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          <button type="submit">Acessar</button>
        </form>

        <Link className="button-link" to="/register">
        Nao possui uma conta? Cadastre-se
        </Link>
      </div>
    )
}