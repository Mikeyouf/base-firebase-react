import React, { useContext } from 'react'
import firebaseContext from './../firebase/context'
import MessageForm from './MessageForm'
import useForm from './../hooks/useForm'
import validateMessage from './../utils/validateMessage'

const INITIAL_STATE = {
    message: ''
}

const CreateMessage = () => {
    const { user, firebase } = useContext(firebaseContext)

    const handleCreateMessage = () => {
        const { message } = values
        const newMessage = {
            message,
            postedBy: {
                id: user.uid,
                name: user.displayName
            },
            likes: [],
            createAt: Date.now(),
            photo: user.photoURL
        }
        firebase.db.collection('messages').add(newMessage)
    }
    const { handleSubmit, handleKeyDown, values, handleChange, errors } = useForm(
        INITIAL_STATE, 
        validateMessage,
        handleCreateMessage,
        )

    return ( 
        <>
        {
            user &&
            <MessageForm 
                handleSubmit={handleSubmit} 
                handleKeyDown={handleKeyDown} 
                handleChange={handleChange} 
                values={values}
                errors={errors}
                user={user}
            />
        }
        </>
     );
}
 
export default CreateMessage;