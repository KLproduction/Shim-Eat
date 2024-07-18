
import { RegisterForm } from '@/components/auth/RegisterForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'


const RegisterPage = async() => {
  const session = await auth()
  if (session){
    redirect("/setting")
  }
  return (
    <>
    <RegisterForm/>
    
    </>
  )
}

export default RegisterPage