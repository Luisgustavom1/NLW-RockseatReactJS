import { FormEvent, useState } from 'react'

import {useHistory} from 'react-router-dom'

import { database } from '../services/firebase'
import useAuth from '../hooks/useAuth'

import {Button} from '../components/button'
import illustrationImg from '../assets/imgs/illustration.svg'
import logoImg from '../assets/imgs/logo.svg'
import logoGoogleImg from '../assets/imgs/google-icon.svg'
import login from '../assets/imgs/log-in 1.svg'

import '../styles/auth.scss'

export function Home(){
    const history = useHistory();
    const {user, siginWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom(){
        if(!user){
            await siginWithGoogle()
        }

        history.push('/room/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()

        if(roomCode.trim() === ''){
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()
        if(!roomRef.exists()){
            alert('Sala inexistente, verifique o código e tente novamente')
            return;
        }
        if(roomRef.val().endedAt){
            alert('A sala ja foi encerrada')
            return;
        }

        history.push(`/room/${roomCode}`)
    }

    return(
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Imagem de ilustração"/>
                {/* <div> */}
                    <strong>Toda pergunta tem uma resposta</strong>
                    <p>Tire as dúvidas da sua audiência em tempo real</p>
                {/* </div> */}
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Imagem logo"/>
                    <button className='google' onClick={handleCreateRoom}>
                        <img src={logoGoogleImg} alt="Logo da google"/>Crie sua sala com o Google
                    </button>
                    
                    <div className='separator'>ou entre em uma sala</div>

                    <form action="" onSubmit={handleJoinRoom}>
                        <input type="text" placeholder='Digite o código da sala' value={roomCode} onChange={e => setRoomCode(e.target.value)}/>
                        <Button type='submit'> <img src={login} alt="Icone de login"/> Entrar da sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}