import LoginClient from './login-client'

export const metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return <LoginClient />
}
