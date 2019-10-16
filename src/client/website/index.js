import React from 'react'
import { Redirect } from 'react-router-dom'

export default () => {
  console.log("Payture website stub");
  
  return (
    <Redirect to={'/admin-panel'} />
  )
}