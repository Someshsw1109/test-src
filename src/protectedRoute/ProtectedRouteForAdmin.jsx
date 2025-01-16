/* eslint-disable react/prop-types */
import { Navigate } from "react-router"
import React from 'react'
import { useSelector } from 'react-redux'

export const ProtectedRouteForAdmin = ({children}) => {
  const {token} = useSelector((state) => state.auth);
  
  if(token !== null){
    console.log("protect route shi he:");
    return children

  }
  else
      return <Navigate to="/login" />
}