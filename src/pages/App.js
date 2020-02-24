import React from 'react'
import '../styles/App.css'
import Header from './../components/Header'
// import Message from './../components/Message'
import CreateMessage from './../components/CreateMessage'

import firebase, { firebaseContext } from './../firebase'
import useAuth from './../hooks/useAuth'
import MessagesList from '../components/MessagesList'

const App = () => {
  const user = useAuth()
  // console.log(user)

  return (
    <firebaseContext.Provider value={{ user, firebase }}>
      <div className='app'>
        <Header />
        <CreateMessage />
        <MessagesList/>
      </div>
    </firebaseContext.Provider>
  )
}

export default App
