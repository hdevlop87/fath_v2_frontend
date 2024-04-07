import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr'
});


export default async function middleware(req: NextRequest) {
  return intlMiddleware(req);
}


export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};