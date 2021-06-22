import { useContext } from "react";
import {AuthContext} from '../contexts/authContext'

export default function useAuth(){
    const value = useContext(AuthContext)
    return(
        value
    )
}