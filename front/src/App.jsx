import Home from './views/Home/Home'
import Login from './views/Login/Login'
import MisTurnos from './views/MisTurnos/MisTurnos'
import Register from './views/Register/Register'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { useEffect, useState, } from 'react'
import NotFound from './components/NotFound/NotFound'
import AgendarTurno from './views/AgendarTurno/AgendarTurno'



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(false);
  const [isNotFound, setNotFound] = useState(false);

    useEffect(() => {

      const validRoutes = ['/login', '/register', '/', '/agendarTurno', '/misTurnos'];
      setNotFound(!validRoutes.includes(location.pathname));
    
      const userJson = localStorage.getItem('user');
      const user = JSON.parse(userJson);
      if (user) setUser(user);

      if (!user && location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/login');
      }
      if (user && (location.pathname === '/login' || location.pathname === '/register')) {
        navigate('/');
      }


    }, [location.pathname, navigate ]);
  return (
    <>

      {!user ? (
        <>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </>
      ) : (
        <>
          {!isNotFound && (
            <>
              <Navbar user={user} setUser={setUser}/>     
            </>      
          )}
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/agendarTurno" element={<AgendarTurno />} />
              <Route path="/misTurnos" element={<MisTurnos userId={user?.id} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        </>
      )
      }      
    </>
  )
}

export default App
