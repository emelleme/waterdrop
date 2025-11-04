// Cloudflare Function: /api/rsvp
// Enhanced RSVP handling with D1 database integration

export interface RSVPRequest {
  wallet_address?: string;
  donation_amount?: number;
  get_wristband?: boolean;
  name?: string;
  email?: string;
}

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    try {
      // Handle CORS
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
      }

      const db = env.DB;
      const data: RSVPRequest = await request.json();

      // Validate required fields
      if (!data.name && !data.wallet_address) {
        return new Response(JSON.stringify({ 
          error: 'Either name/email or wallet_address required' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Check if we've reached the limit of 50 free RSVPs
      const countResult = await db.prepare(`
        SELECT COUNT(*) as count FROM rsvps
      `).first();

      if (countResult && countResult.count >= 50) {
        return new Response(JSON.stringify({ 
          error: 'Sorry, the free RSVP limit of 50 has been reached. Please check back later for updates.' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Insert RSVP record
      const stmt = db.prepare(`
        INSERT INTO rsvps (wallet_address, name, email, donation_amount, get_wristband)
        VALUES (?, ?, ?, ?, ?)
      `);

      const result = await stmt.bind(
        data.wallet_address || null,
        data.name || null,
        data.email || null,
        data.donation_amount || 0,
        data.get_wristband || false
      ).run();

      // Update event statistics
      await db.prepare(`
        INSERT OR REPLACE INTO event_stats (stat_key, stat_value, updated_at)
        VALUES (
          'total_rsvps',
          (SELECT COALESCE(COUNT(*), 0) FROM rsvps),
          CURRENT_TIMESTAMP
        )
      `).run();

      // If there's a donation, also insert into donations table
      if (data.donation_amount && data.donation_amount > 0) {
        await db.prepare(`
          INSERT INTO donations (wallet_address, amount, donation_type)
          VALUES (?, ?, ?)
        `).bind(
          data.wallet_address,
          data.donation_amount,
          'hurricane_relief'
        ).run();

        // Update donation statistics
        await db.prepare(`
          INSERT OR REPLACE INTO event_stats (stat_key, stat_value, updated_at)
          VALUES (
            'total_donations',
            (SELECT COALESCE(SUM(amount), 0) FROM donations),
            CURRENT_TIMESTAMP
          )
        `).run();

        await db.prepare(`
          INSERT OR REPLACE INTO event_stats (stat_key, stat_value, updated_at)
          VALUES (
            'total_donors',
            (SELECT COALESCE(COUNT(DISTINCT wallet_address), 0) FROM donations WHERE wallet_address IS NOT NULL),
            CURRENT_TIMESTAMP
          )
        `).run();
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'RSVP recorded successfully',
        rsvpId: result.lastInsertRowId
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });

    } catch (error) {
      console.error('RSVP API error:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to process RSVP' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
    }
  },
};
