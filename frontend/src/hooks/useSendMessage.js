import { useState } from "react"
import useConversation from "../store/useConversation"
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation(); 

    const sendMessage = async (message)=>{
        setLoading(true)
        try {
            const res  = await fetch()
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

}

export default useSendMessage