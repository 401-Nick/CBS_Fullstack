import LoginModule from "../../components/LoginModule"
import Link from 'next/link';

export default function Home() {

  return (
    <main className="main">
      <p>go to /login or /register</p>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </main>
  )
}
