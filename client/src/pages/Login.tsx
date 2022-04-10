import React from 'react'
import { Card } from '@mui/material';
import LoginForm from '../components/authentication/LoginForm'
//import Card from '../theme/overrides/Card'

function Login() {
  return (
    <Card sx={{padding:5, margin:6}}>
      <LoginForm/>
    </Card>
  )
}

export default Login