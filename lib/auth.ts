import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
}

/**
 * @param request 
 * @returns
 */
export const verifyAuth = (request: NextRequest): TokenPayload => {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Akses ditolak: Token tidak ada atau format salah');
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error('Akses ditolak: Token tidak valid atau kadaluarsa');
  }
};