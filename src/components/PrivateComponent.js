import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {
    const auth = localStorage.getItem('user')
    return auth ? (
        <Outlet />
    ) : <Navigate to="/sign-up" />
}

export default PrivateComponent