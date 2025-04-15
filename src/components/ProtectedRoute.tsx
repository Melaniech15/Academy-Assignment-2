import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import React from 'react'

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore()
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  // Otherwise, render the child routes
  return <Outlet />
}

export default ProtectedRoute