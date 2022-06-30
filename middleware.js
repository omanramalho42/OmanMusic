import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  //TOKEN WILL EXIST IF USER IS LOGGED IN
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  //ALLOW THR REQUESTS IF THE FOLLOWING IS TRUE...
  //1) ITS A REQUEST FOR NEXT-AUTH SESSION & PROVIDER FETCHING
  //2) THE TOKEN EXISTS

  if(pathname.includes('/api/auth') || token ) {
    return NextResponse.next();
  }

  //REDIRECT THEM TO LOGIN IF THEY DONT HAVE TOKEN AND REQUESTING A PROTECTED ROUTE
  if(!token && pathname !== '/login') {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
  }
}

export const config = {
  matcher: ['/'],
}