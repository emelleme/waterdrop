import { Env } from '@cloudflare/workers-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json<{ email?: string, wallet_address?: string, quantity?: number, tx_signature?: string }>();
    const email = (body?.email || '').trim();
    const wallet_address = (body?.wallet_address || '').trim();
    const quantity = Number(body?.quantity) || 1;
    const tx_signature = body?.tx_signature || '';

    if (quantity < 1) {
      return new Response('Invalid quantity', { status: 400 });
    }

    if (tx_signature) {
      // Verify Solana transaction
      // Placeholder RPC call - in real, fetch tx from https://api.mainnet-beta.solana.com
      // Check if it's transfer from wallet_address to authority, amount = 0.1 SOL * quantity
      // For now, log and assume success
      console.log(`Verifying tx ${tx_signature} for ${quantity} wristbands to ${wallet_address}`);
      // TODO: Implement RPC verification
      // const response = await fetch(`${env.SOLANA_RPC || 'https://api.devnet.solana.com'}/`, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     jsonrpc: '2.0',
      //     id: 1,
      //     method: 'getTransaction',
      //     params: [tx_signature, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }],
      //   }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const tx = await response.json();
      // Validate tx...
    } else if (!email) {
      return new Response('Email or wallet_address required', { status: 400 });
    }

    // Insert into D1
    const stmt = env.DB.prepare(
      'INSERT INTO wristbands (email, wallet_address, quantity, created_at) VALUES (?1, ?2, ?3, datetime("now"))'
    );
    await stmt.bind(email || null, wallet_address || null, quantity).run();

    // Load $DROP tokens - placeholder
    if (tx_signature && wallet_address) {
      // TODO: SPL transfer from treasury to wallet_address, amount = 15 * quantity * decimals
      // Use @solana/spl-token in worker with authority keypair
      // const dropMint = new PublicKey(env.DROP_MINT || 'placeholder_mint');
      // SPL transfer logic here...
      console.log(`Loaded $DROP to ${wallet_address} for ${quantity} wristbands`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response('Server error', { status: 500 });
  }
};
