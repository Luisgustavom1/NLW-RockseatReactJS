import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

import { Button } from '../components/button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/question'

import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
// import useAuth from '../hooks/useAuth'
import toast, { Toaster } from 'react-hot-toast'

import logoImg from '../assets/imgs/logo.svg'
import remove from '../assets/imgs/delete.svg'
import check from '../assets/imgs/check.svg'
import answer from '../assets/imgs/answer.svg'
import '../styles/room.scss'


type roomParams = {
    id: string,
} 

export function AdminRoom(){
    // const {user} = useAuth()
    const history = useHistory()
    const params = useParams<roomParams>() 
    const roomId = params.id
    
    const { questions, title} = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir esta pergunta?')){
            const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }
    async function handleQuestionAsAnswered(questionId: string) {
        const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
        toast.success('Questão respondida e finalizada com sucesso!!')
    }
    async function handleHighlightQuestion(questionId: string, isHighLighted: boolean) {
        if(!isHighLighted){
            const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isHighLighted: true,
            })
        }else{
            const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isHighLighted: false,
            })
        }
    }

    return(
        <div id="page-room">
            <div><Toaster/></div>
            <header>
                <div className="content admin">
                    <a href="/"><img src={logoImg} alt="Logo letmeask" /></a>
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={() => {handleEndRoom()}}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <div className='question-list'>
                    {questions.map(question => {
                        return(
                            <Question 
                            key={question.id}
                            content={question.content} 
                            author={question.author} 
                            isAnswered={question.isAnswered}
                            isHighLighted={question.isHighLighted}
                        >
                            {!question.isAnswered && (
                                <>
                                    <button type='button' onClick={() => handleQuestionAsAnswered(question.id)}><img src={check} alt="Clique para marcar como resposta" /></button>
                                    <button type='button' onClick={() => handleHighlightQuestion(question.id, question.isHighLighted)}> <img src={answer} alt="Clique para dar destaque a pergunta" /></button>
                                </>
                            )}
                            <button type='button' onClick={() => handleDeleteQuestion(question.id)}> <img src={remove} alt="Clique para remover a pergunta" /></button>
                        </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}