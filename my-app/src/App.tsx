import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './page/login'
import Main from './page/main'
import { UserType } from './types'

const App: React.FC = () => {
  const [user, setUser] = useState<UserType>(
    sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user')!)
      : null
  )

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route
          path='*'
          element={user ? <Main user={user} setUser={setUser} /> : <Navigate to='/login' replace={true} />}
        />
      </Routes>
    </div>
  )
}

export default App
