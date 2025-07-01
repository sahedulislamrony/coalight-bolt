import { cookies } from 'next/headers';
import { User } from '@/types/auth';

export interface Session {
  user: User | null;
  isAuthenticated: boolean;
}

export async function getSession(): Promise<Session> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    
    if (!accessToken) {
      return { user: null, isAuthenticated: false };
    }

    // Verify token with backend
    const response = await fetch(`${process.env.EXPRESS_API_BASE_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return { user: null, isAuthenticated: false };
    }

    const { user } = await response.json();
    return { user, isAuthenticated: true };
  } catch (error) {
    console.error('Session verification failed:', error);
    return { user: null, isAuthenticated: false };
  }
}

export async function requireAuth(): Promise<User> {
  const session = await getSession();
  
  if (!session.isAuthenticated || !session.user) {
    throw new Error('Authentication required');
  }
  
  return session.user;
}