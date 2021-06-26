import {Link, useHistory} from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/imgs/illustration.svg'
import logoImg from '../assets/imgs/logo.svg'
import login from '../assets/imgs/log-in 1.svg'

import {Button} from '../components/button'

import '../styles/auth.scss'
import useAuth from '../hooks/useAuth'
import { database } from '../services/firebase'

export function NewRoom(){
    const {user} = useAuth()
    const [newRoom, setNewRoom] = useState('')
    const history = useHistory()

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === ''){
            return;
        }
        
        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        history.push(`/admin/room/${firebaseRoom.key}`)
    }
    return(
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Imagem de ilustração"/>
                <strong>Toda pergunta tem uma resposta</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content newRoom'>
                    <img src={logoImg} alt="Imagem logo"/>
                    
                    <div className='user-data'>
                        <h1>{user?.name}</h1>
                        <p><img src={user?.avatar} alt="Foto do avatar" /></p>
                    </div>

                    <h2>Crie uma nova sala</h2>
                    <form action="" onSubmit={handleCreateRoom}>
                        <input type="text" placeholder='Nome da sala' value={newRoom} onChange={e => setNewRoom(e.target.value)}/>
                        <Button type='submit'> <img src={login} alt="Icone de login" /> Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to="/"> Clique aqui </Link> </p>
                </div>
            </main>
        </div>
    )
}