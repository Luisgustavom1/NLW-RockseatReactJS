import logoImg from '../assets/imgs/logo.svg'
import '../styles/room.scss'

import { useParams } from 'react-router'
import {Button} from '../components/button'
import { RoomCode } from '../components/RoomCode'
import { FormEvent, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { database } from '../services/firebase'

type roomParams = {
    id: string,
} 

type Questions = {
    id: string,
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean,
}

type FirebaseQuestion = Record<string, {
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean,
}>
export default function Room(){
    const {user} = useAuth()
    const params = useParams<roomParams>() 
    const roomId = params.id
    
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Questions[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestion: FirebaseQuestion = databaseRoom.questions ?? {}

            const parsedQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])

    async function handleNewQuestion(event: FormEvent){
        event.preventDefault()
        if(newQuestion.trim() === ''){
            return;
        }
        if(!user){
            throw new Error('You must be logged id')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('');
    }
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo letmeask" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>
                <form onSubmit={handleNewQuestion}>
                    <textarea placeholder='O que voçê quer perguntar?' value={newQuestion} onChange={e => setNewQuestion(e.target.value)}></textarea>

                    <div className='form-footer'>
                        {user ? (
                            <div className='user-info'>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                            )}
                        <Button type='submit' disabled={!user}>Enviar pegunta</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>
    )
}