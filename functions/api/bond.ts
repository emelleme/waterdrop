import { Env } from '@cloudflare/workers-types';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { env } = context;
    // Table `bond_status` has columns: raised REAL, goal REAL (single row)
    const result = await env.DB.prepare(
      'SELECT raised, goal FROM bond_status LIMIT 1'
    ).first();
    if (!result) {
      // default values if none set
      return new Response(
        JSON.stringify({ raised: 0, goal: 75000 }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ raised: 0, goal: 75000 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
