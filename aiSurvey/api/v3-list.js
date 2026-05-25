// Lists every v3 survey response stored in Neon Postgres.
// Protected by RESULTS_PASSWORD env var (if set). Without the password,
// the endpoint returns 403. With no env var configured, it is open —
// fine for a private staging deploy, never leave it open in production.

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
    const password = process.env.RESULTS_PASSWORD;
    if (password) {
        const provided = req.query.password || req.headers['x-results-password'];
        if (provided !== password) {
            return res.status(403).json({ error: 'Forbidden' });
        }
    }

    try {
        const rows = await sql`
            SELECT id, created_at, payload
            FROM v3_responses
            ORDER BY created_at DESC
        `;

        // Reshape so the dashboard sees the original payload shape it expects,
        // with database id and timestamp surfaced as _id and _storedAt.
        const reshaped = rows.map(r => ({
            ...r.payload,
            _id: r.id,
            _storedAt: r.created_at
        }));

        return res.status(200).json({ count: reshaped.length, rows: reshaped });
    } catch (err) {
        console.error('v3-list error:', err);
        return res.status(500).json({
            error: 'Storage error',
            detail: String(err.message || err)
        });
    }
}
