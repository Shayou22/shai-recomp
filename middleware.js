// middleware.js — Vercel Edge Middleware
// Protection HTTP Basic Auth — intercepte toutes les requêtes avant chargement
// Pour changer le mot de passe : modifier VALID_CREDENTIALS ci-dessous

export const config = { matcher: ['/(.*)', '/'] };

const VALID_CREDENTIALS = 'U2hheW91MjI6QVZJMTkwOWNvbnNlaWxzLg=='; // Shayou22:AVI1909conseils.

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader && authHeader.startsWith('Basic ')) {
    const provided = authHeader.slice(6); // retire "Basic "
    if (provided === VALID_CREDENTIALS) {
      return new Response(null, { status: 200 }); // accès autorisé — laisse passer
    }
  }

  // Accès refusé — demande le mot de passe
  return new Response('Accès non autorisé', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Programme Recomposition Shai", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=UTF-8',
    },
  });
}
