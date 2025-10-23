import { Env } from '@cloudflare/workers-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json();
    const name = (body?.name || '').trim();
    const email = (body?.email || '').trim();
    if (!name || !email) {
      return new Response('Invalid RSVP data', { status: 400 });
    }
    // Insert into D1 table `rsvps` (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, created_at TIMESTAMP)
    const stmt = env.DB.prepare(
      'INSERT INTO rsvps (name, email, created_at) VALUES (?1, ?2, datetime("now"))'
    );
    await stmt.bind(name, email).run();
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response('Server error', { status: 500 });
  }
};