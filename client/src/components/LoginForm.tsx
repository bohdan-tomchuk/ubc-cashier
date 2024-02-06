import { Card, TextInput, Label, Button } from 'flowbite-react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })
  const { login, isLoading } = useLogin()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    await login(formState.email, formState.password)
    navigate('/')
  }

  return (
    <Card className="max-w-[380px] w-[80%]">
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-6">
        <div className="mb-2 block">
          <Label htmlFor="password" value="Пароль" />
        </div>
        <TextInput
          id="password"
          name="password"
          placeholder="Пароль"
          value={formState.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button 
        fullSized
        onClick={handleSubmit}
        isProcessing={isLoading}
      >
        Підтвердити
      </Button>
    </Card>
  )
}
