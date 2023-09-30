'use client';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../helpers/firebase";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        placeholder="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  )
}

export default LoginPage;
