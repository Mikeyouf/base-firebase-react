import React, { useContext, useState, useEffect } from 'react'
import firebaseContext from './../firebase/context'
import Message from './Message';

const MessagesList = () => {
    const { firebase } = useContext(firebaseContext)
    const [messages, setMessages] = useState([])
    const handleSnapshot = snapshot => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setMessages(messages)
    }
    useEffect(() => {
        const getMessage = () => {
            firebase.db.collection('messages').orderBy('createAt', 'desc').onSnapshot(handleSnapshot)
        }

        return getMessage()
    }, [firebase])

    return ( 
        <div>
            {
                messages.map( message => 
                    <Message key={message.id} message={message} />
                )
            }
        </div>
     );
}
 
export default MessagesList