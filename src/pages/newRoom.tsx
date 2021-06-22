import {Link} from 'react-router-dom'

import illustrationImg from '../assets/imgs/illustration.svg'
import logoImg from '../assets/imgs/logo.svg'
import login from '../assets/imgs/log-in 1.svg'

import {Button} from '../components/button'

import '../styles/auth.scss'
import useAuth from '../hooks/useAuth'

export function NewRoom(){
    const {user} = useAuth()
    return(
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Imagem de ilustração"/>
                <strong>Toda pergunta tem uma resposta</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Imagem logo"/>
                    <h1>{user?.name}</h1>
                    <h2>Crie uma nova sala</h2>
                    <form action="">
                        <input type="text" placeholder='Nome da sala'/>
                        <Button type='submit'> <img src={login} alt="Icone de login" /> Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to="/"> Clique aqui </Link> </p>
                </div>
            </main>
        </div>
    )
}