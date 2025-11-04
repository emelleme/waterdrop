// Cloudflare Function: /api/stats
// Returns real-time event statistics for the dashboard

export interface EventStats {
  rsvpCount: number;
  totalDonations: number;
  donorCount: number;
  verifiedOrgs: number;
  reefsBuilt: number;
  reefGoal: number;
  blessingTime: string;
  eventDate: string;
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

      if (request.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
      }

      // Get database instance
      const db = env.DB;
      
      // Fetch real-time statistics
      const stats = await db.prepare(`
        SELECT 
          (SELECT COALESCE(SUM(stat_value), 0) FROM event_stats WHERE stat_key = 'total_rsvps') as rsvp_count,
          (SELECT COALESCE(SUM(stat_value), 0) FROM event_stats WHERE stat_key = 'total_donations') as total_donations,
          (SELECT COALESCE(SUM(stat_value), 0) FROM event_stats WHERE stat_key = 'total_donors') as donor_count,
          (SELECT COALESCE(SUM(stat_value), 0) FROM event_stats WHERE stat_key = 'verified_organizations') as verified_orgs,
          (SELECT COALESCE(SUM(stat_value), 0) FROM event_stats WHERE stat_key = 'reefs_built') as reefs_built,
          (SELECT COALESCE(SUM(stat_value), 0) FROM event_stats WHERE stat_key = 'reef_goal') as reef_goal
      `).first();

      // Also get live counts from actual tables for accuracy
      const liveRsvpCount = await db.prepare(`SELECT COUNT(*) as count FROM rsvps`).first();
      const liveDonorCount = await db.prepare(`SELECT COUNT(DISTINCT wallet_address) as count FROM donations WHERE wallet_address IS NOT NULL`).first();
      const liveOrgCount = await db.prepare(`SELECT COUNT(*) as count FROM organizations WHERE status = 'verified'`).first();

      const eventStats: EventStats = {
        rsvpCount: liveRsvpCount?.count || 0,
        totalDonations: stats?.total_donations || 0,
        donorCount: liveDonorCount?.count || 0,
        verifiedOrgs: liveOrgCount?.count || 0,
        reefsBuilt: stats?.reefs_built || 0,
        reefGoal: stats?.reef_goal || 100,
        blessingTime: "5:30–6:00 PM",
        eventDate: "Sat Nov 8, 2025"
      };

      return new Response(JSON.stringify(eventStats), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache'
        },
      });

    } catch (error) {
      console.error('Stats API error:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch event statistics',
        rsvpCount: 0,
        totalDonations: 0,
        donorCount: 0,
        verifiedOrgs: 3,
        reefsBuilt: 0,
        reefGoal: 100,
        blessingTime: "5:30–6:00 PM",
        eventDate: "Sat Nov 8, 2025"
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
