// middleware.js — Vercel Edge Middleware
// Protection HTTP Basic Auth

import { NextResponse } from 'next/server';

export const config = { matcher: ['/((?!_next|favicon.ico).*)'] };

const VALID_CREDENTIALS = 'U2hheW91MjI6QVZJMTkwOWNvbnNlaWxzLg=='; // Shayou22:AVI1909conseils.

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader && authHeader.startsWith('Basic ')) {
    const provided = authHeader.slice(6);
    if (provided === VALID_CREDENTIALS) {
      return NextResponse.next(); // identifiants corrects → laisse passer
    }
  }

  // Identifiants absents ou incorrects → demande le login
  return new Response('Accès non autorisé', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Programme Recomposition Shai", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=UTF-8',
    },
  });
}
