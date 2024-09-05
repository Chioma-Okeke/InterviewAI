import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function ProtectedRoute() {
    const {isAuthenticated} = useContext(AuthContext)
    const location = useLocation()

    if (!isAuthenticated) {
        sessionStorage.setItem("redirectBackTo", location.pathname)
        return <Navigate to="/login" state={{from: location}}/>
    }

  return (
    <Outlet/>
  )
}

export default ProtectedRoute