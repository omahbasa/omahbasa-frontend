import { redirect } from 'next/navigation';

export default async function RootPage() {
  const userIsLoggedIn = true;

  if (userIsLoggedIn) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}