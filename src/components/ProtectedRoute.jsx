import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function ProtectedRoute() {
    const {isAuthenticated, loading} = useContext(AuthContext)
    const location = useLocation()

    if (!loading && !isAuthenticated) {
        sessionStorage.setItem("redirectBackTo", location.pathname)
        return <Navigate to="/auth/login" state={{from: location}}/>
    }

  return (
    <Outlet/>
  )
}

export default ProtectedRoute