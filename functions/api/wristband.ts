import { Env } from '@cloudflare/workers-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json();
    const email = (body?.email || '').trim();
    const quantity = Number(body?.quantity) || 1;
    if (!email || quantity < 1) {
      return new Response('Invalid wristband purchase', { status: 400 });
    }
    // Insert into D1 table `wristbands` (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, quantity INTEGER, created_at TIMESTAMP)
    const stmt = env.DB.prepare(
      'INSERT INTO wristbands (email, quantity, created_at) VALUES (?1, ?2, datetime("now"))'
    );
    await stmt.bind(email, quantity).run();
    // In a real implementation, integrate with payment processing here
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response('Server error', { status: 500 });
  }
};
