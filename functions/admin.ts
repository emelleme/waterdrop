import { Env } from '@cloudflare/workers-types';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { env } = context;
    
    // Fetch all RSVPs and wristbands
    const [rsvpsResult, wristbandsResult] = await Promise.all([
      env.DB.prepare('SELECT * FROM rsvps ORDER BY created_at DESC').all(),
      env.DB.prepare('SELECT * FROM wristbands ORDER BY created_at DESC').all()
    ]);

    const rsvps = rsvpsResult.results || [];
    const wristbands = wristbandsResult.results || [];
    
    // Calculate totals
    const totalRsvps = rsvps.length;
    const totalWristbands = wristbands.reduce((sum, w) => sum + (w.quantity || 0), 0);
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Waterdrop '88 Admin Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: #0f172a; color: white; }
  </style>
</head>
<body class="p-6 font-sans">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-center">Waterdrop '88 Admin Dashboard</h1>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-blue-900/50 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Total RSVPs</h2>
        <p class="text-4xl font-bold">${totalRsvps}</p>
      </div>
      <div class="bg-green-900/50 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Total Wristbands</h2>
        <p class="text-4xl font-bold">${totalWristbands}</p>
      </div>
    </div>

    <!-- RSVPs Table -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">RSVPs</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-slate-800/50 rounded-lg">
          <thead>
            <tr class="border-b border-slate-700">
              <th class="text-left p-4">Name</th>
              <th class="text-left p-4">Email</th>
              <th class="text-left p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            ${rsvps.map(rsvp => `
              <tr class="border-b border-slate-700 hover:bg-slate-700/50">
                <td class="p-4">${rsvp.name}</td>
                <td class="p-4">${rsvp.email}</td>
                <td class="p-4">${new Date(rsvp.created_at).toLocaleDateString()}</td>
              </tr>
            `).join('')}
            ${rsvps.length === 0 ? `
              <tr>
                <td colspan="3" class="p-4 text-center text-slate-400">No RSVPs yet</td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Wristbands Table -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Wristband Purchases</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-slate-800/50 rounded-lg">
          <thead>
            <tr class="border-b border-slate-700">
              <th class="text-left p-4">Email</th>
              <th class="text-left p-4">Quantity</th>
              <th class="text-left p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            ${wristbands.map(wristband => `
              <tr class="border-b border-slate-700 hover:bg-slate-700/50">
                <td class="p-4">${wristband.email}</td>
                <td class="p-4">${wristband.quantity}</td>
                <td class="p-4">${new Date(wristband.created_at).toLocaleDateString()}</td>
              </tr>
            `).join('')}
            ${wristbands.length === 0 ? `
              <tr>
                <td colspan="3" class="p-4 text-center text-slate-400">No wristband purchases yet</td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Refresh Button -->
    <div class="mt-8 text-center">
      <button onclick="location.reload()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
        Refresh Data
      </button>
    </div>
  </div>
</body>
</html>
    `;

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    return new Response(`
      <html>
        <body class="bg-slate-900 text-white p-8">
          <h1 class="text-2xl font-bold mb-4">Error</h1>
          <p>Failed to load admin dashboard: ${err.message}</p>
          <p class="mt-4 text-sm text-slate-400">Make sure the database is properly initialized.</p>
        </body>
      </html>
    `, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
};
