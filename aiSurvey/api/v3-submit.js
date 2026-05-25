// Stores one v3 survey response in Neon Postgres.
// Public POST endpoint, no auth — the body is whatever the survey sends.
// Each row is one INSERT into the v3_responses table.
//
// Required env var (auto-injected by Vercel when a Neon DB is connected):
//   DATABASE_URL
//
// Required schema (run once in Neon's SQL editor — see DEPLOYMENT.md):
//   CREATE TABLE v3_responses (
//     id              uuid       PRIMARY KEY,
//     created_at      timestamptz NOT NULL DEFAULT now(),
//     payload         jsonb      NOT NULL,
//     participant_code text,
//     survey_mode     text,
//     course_id       text,
//     attention_pass  boolean
//   );

import { neon } from '@neondatabase/serverless';
import { randomUUID } from 'node:crypto';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const payload = req.body;
    if (!payload || typeof payload !== 'object' || payload.instrumentVersion !== 'v3') {
        return res.status(400).json({
            error: 'Bad payload',
            detail: 'Expected an object with instrumentVersion="v3"'
        });
    }

    try {
        const id = randomUUID();
        await sql`
            INSERT INTO v3_responses (
                id, payload, participant_code, survey_mode, course_id, attention_pass
            ) VALUES (
                ${id},
                ${JSON.stringify(payload)}::jsonb,
                ${payload.participantCode || null},
                ${payload.surveyMode || null},
                ${payload.courseIdentifier || null},
                ${payload.attentionCheckPassed === true}
            )
        `;
        return res.status(200).json({ ok: true, id });
    } catch (err) {
        console.error('v3-submit error:', err);
        return res.status(500).json({
            error: 'Storage error',
            detail: String(err.message || err)
        });
    }
}
