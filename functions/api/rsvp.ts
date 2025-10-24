import { Env } from '@cloudflare/workers-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json<{ name?: string, email?: string, wallet_address?: string }>();
    const name = (body?.name || '').trim();
    const email = (body?.email || '').trim();
    const wallet_address = (body?.wallet_address || '').trim();

    if (!name || !email) {
      if (!wallet_address) {
        return new Response('At least name+email or wallet_address is required', { status: 400 });
      }
    }

    // Insert into D1 table `rsvps` (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, wallet_address TEXT, created_at TIMESTAMP)
    const stmt = env.DB.prepare(
      'INSERT INTO rsvps (name, email, wallet_address, created_at) VALUES (?1, ?2, ?3, datetime("now"))'
    );
    await stmt.bind(name || null, email || null, wallet_address || null).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response('Server error', { status: 500 });
  }
};
