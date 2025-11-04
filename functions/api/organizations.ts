// Cloudflare Function: /api/organizations
// Manage Jamaica Relief Network organizations

export interface Organization {
  id?: number;
  name: string;
  focus_area: string;
  website?: string;
  contact_email?: string;
  wallet_address?: string;
  status?: 'pending' | 'verified' | 'rejected';
  impact_description?: string;
  proof_links?: string;
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
            'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      const db = env.DB;
      const url = new URL(request.url);
      const method = request.method;

      if (method === 'GET') {
        // Get all organizations or filter by status
        const status = url.searchParams.get('status');
        let query = 'SELECT * FROM organizations';
        let params = [];

        if (status) {
          query += ' WHERE status = ?';
          params.push(status);
        }

        query += ' ORDER BY created_at DESC';

        const stmt = db.prepare(query);
        if (params.length > 0) {
          stmt.bind(...params);
        }

        const organizations = await stmt.all();

        return new Response(JSON.stringify({ 
          organizations: organizations.results || [] 
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

      } else if (method === 'POST') {
        // Submit new organization for verification
        const data: Organization = await request.json();

        // Validate required fields
        if (!data.name || !data.focus_area) {
          return new Response(JSON.stringify({ 
            error: 'Name and focus area are required' 
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const stmt = db.prepare(`
          INSERT INTO organizations (name, focus_area, website, contact_email, wallet_address, status, impact_description, proof_links)
          VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)
        `);

        const result = await stmt.bind(
          data.name,
          data.focus_area,
          data.website || null,
          data.contact_email || null,
          data.wallet_address || null,
          data.impact_description || null,
          data.proof_links || null
        ).run();

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Organization submitted for verification',
          organizationId: result.lastInsertRowId
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

      } else if (method === 'PUT') {
        // Update organization status (for admin use)
        const data = await request.json();
        const { id, status } = data;

        if (!id || !status) {
          return new Response(JSON.stringify({ 
            error: 'ID and status are required' 
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Update organization status
        const stmt = db.prepare(`
          UPDATE organizations 
          SET status = ?, verified_at = CASE WHEN ? = 'verified' THEN CURRENT_TIMESTAMP ELSE verified_at END
          WHERE id = ?
        `);

        await stmt.bind(status, status, id).run();

        // Update verified organizations count
        await db.prepare(`
          INSERT OR REPLACE INTO event_stats (stat_key, stat_value, updated_at)
          VALUES (
            'verified_organizations',
            (SELECT COALESCE(COUNT(*), 0) FROM organizations WHERE status = 'verified'),
            CURRENT_TIMESTAMP
          )
        `).run();

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Organization status updated'
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

      } else {
        return new Response('Method not allowed', { status: 405 });
      }

    } catch (error) {
      console.error('Organizations API error:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to process organization request' 
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
