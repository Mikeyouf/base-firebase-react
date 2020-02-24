import React from 'react';

const MessageForm = ({ handleSubmit, handleKeyDown, handleChange, values, errors, user }) => {
    return ( 
        <form onSubmit={handleSubmit} className="message-form-container">
            {/* {console.log(user)} */}
            <div className="message-form">
                <div>
                    <img src={user.photoURL} 
                        alt="profil"
                        className="profil-picture"
                    />
                </div>
                <textarea 
                    onKeyDown={handleKeyDown} 
                    onChange={handleChange} 
                    value={values.message}
                    name="message" 
                    placeholder="Quoi de neuf?"
                />
            </div>
            {errors.message && <p className="error-text">{errors.message}</p>}
            <footer>
                <p>{values.message.length > 280 ? '!!!' : 280 - values.message.length}</p>
                <button type="submit" disabled={values.message.length > 280 || values.message.length === 0 ? true : false}>
                    Tweeter
                </button>
            </footer>
        </form>
     );
}
 
export default MessageForm;