import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Header />} />
      </Routes>
    </Router>
  )
}

export default App
