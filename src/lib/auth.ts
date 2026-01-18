import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

export async function getAuthUser(c: Context) {
  const user = c.get('user');

  if (!user || !user.id) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }

  return {
    id: user.id as string,
    email: user.email as string,
  };
}

export async function requireAuth(c: Context, next: () => Promise<void>) {
  await getAuthUser(c);
  await next();
}
