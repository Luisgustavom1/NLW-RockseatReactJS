import illustrationImg from '../assets/imgs/illustration.svg'
import logoImg from '../assets/imgs/logo.svg'
import logoGoogleImg from '../assets/imgs/google-icon.svg'
import login from '../assets/imgs/log-in 1.svg'

import {Button} from '../components/button'
import {useHistory} from 'react-router-dom'

import '../styles/auth.scss'
import useAuth from '../hooks/useAuth'

export function Home(){
    const history = useHistory()
    const {user, siginWithGoogle} = useAuth()

    async function handleCreateRoom(){
        if(!user){
            await siginWithGoogle()
        }

        history.push('/room/new')
    }
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
                    <button className='google' onClick={handleCreateRoom}>
                        <img src={logoGoogleImg} alt="Logo da google"/>Crie sua sala com o Google
                    </button>
                    
                    <div className='separator'>ou entre em uma sala</div>

                    <form action="">
                        <input type="text" placeholder='Digite o código da sala'/>
                        <Button type='submit'> <img src={login} alt="Icone de login" /> Entrar da sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}