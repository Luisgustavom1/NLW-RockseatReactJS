import iconImg from '../assets/imgs/Icon.svg'
import '../styles/roomCode.scss'

type RoomCodeProps = {
    code: string,
}
export function RoomCode(props: RoomCodeProps){
    function copyRoomCodeToClipBoard(){
        navigator.clipboard.writeText(props.code)
    }
    return(
        <button className='room-code' onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={iconImg} alt="Copy room code"/>
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}