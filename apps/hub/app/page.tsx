import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function RootPage() {
  const { userId } = await auth();
  
  // If logged in, redirect to repositories
  // If not logged in, middleware will redirect to sign-in
  if (userId) {
    redirect('/repositories');
  }
  
  // This shouldn't be reached due to middleware, but just in case
  redirect('/sign-in');
}

