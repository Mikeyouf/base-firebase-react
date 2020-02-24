import React, { useContext, useState, useEffect } from 'react'
import firebaseContext from './../firebase/context'
import { FiHeart, FiX, FiMessageCircle, FiUpload, FiRefreshCw } from 'react-icons/fi'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import IconContainer from './IconContainer'

const Message = ({ message }) => {
    let timestamp = message.createAt
    const { user, firebase } = useContext(firebaseContext)
    const isOwner = user && user.uid === message.postedBy.id
    const [isLike, setIsLike] = useState(false)

    useEffect(() => {
        if(user) {
            const isLike = message.likes.some(like => like.likeBy.id === user.uid)
            setIsLike(isLike)
        }
    }, [user, message.likes])

    const handleLike = () => {
        setIsLike(prevIsLike => ! prevIsLike)
        const likeRef = firebase.db.collection('messages').doc(message.id)
        
        if(!isLike) {
            const like = {
                likeBy: {
                    id: user.uid,
                    name: user.displayName
                }
            }
            const updateLikes = [ ...message.likes, like ]
            likeRef.update({ likes: updateLikes })
        } else {
            const updateLikes = message.likes.filter(like => like.likeBy.id !== user.uid)
            likeRef.update({ likes: updateLikes })
        }
    }

    const handleDeleteMessage = () => {
        const messageRef = firebase.db.collection('messages').doc(message.id)
        messageRef.delete()
    }

    return ( 
        <div className="message-container">
            <div>
                <img 
                    src={message.photo}
                    alt="profil"
                    className="profil-picture"
                />
            </div>
            <div className="message">
                <header>
                    <h3>{message.postedBy.name} </h3>
                    <span>¤ {formatDistanceToNow(timestamp, { locale : fr })}</span>
                </header>
                <p>
                    {message.message}
                </p>
                {
                    user &&
                    <footer>
                        <IconContainer color='blue'>
                            <FiMessageCircle/>
                        </IconContainer>
                        <IconContainer color='green'>
                            <FiRefreshCw/>
                        </IconContainer>
                        <IconContainer 
                            color='red' 
                            count={message.likes.length}
                            onClick={() => handleLike()}
                            isLike={isLike}
                        >
                            <FiHeart/>
                        </IconContainer>
                        <IconContainer color='blue'>
                            <FiUpload/>
                        </IconContainer>
                        {
                            isOwner &&
                            <IconContainer color='red' onClick={handleDeleteMessage}>
                                <FiX/>
                            </IconContainer>
                        }
                    </footer>
                }
            </div>
        </div>
     );
}
 
export default Message;