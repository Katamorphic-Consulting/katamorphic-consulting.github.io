// api/import.js

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    const { JSONBIN_API_KEY, JSONBIN_BIN_ID, RESULTS_PASSWORD } = process.env;
    const { password, records } = request.body;

    if (password !== RESULTS_PASSWORD) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    if (!records || typeof records !== 'object') {
        return response.status(400).json({ message: 'records is required' });
    }

    try {
        const fetchResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: { 'X-Master-Key': JSONBIN_API_KEY }
        });
        if (!fetchResponse.ok) {
            return response.status(500).json({ message: 'Error fetching existing results' });
        }
        const data = await fetchResponse.json();
        const existing = data.record;

        for (const firstName in records) {
            if (!existing[firstName]) {
                existing[firstName] = records[firstName];
            } else {
                for (const key in records[firstName]) {
                    if (key === '_archivedAt') {
                        existing[firstName][key] = records[firstName][key];
                    } else if (existing[firstName][key]) {
                        // Merge quiz result, preserving existing submissionTime
                        existing[firstName][key] = {
                            ...existing[firstName][key],
                            ...records[firstName][key]
                        };
                    } else {
                        existing[firstName][key] = records[firstName][key];
                    }
                }
            }
        }

        const putResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify(existing)
        });

        if (!putResponse.ok) {
            return response.status(500).json({ message: 'Error saving results' });
        }

        return response.status(200).json(existing);
    } catch (error) {
        return response.status(500).json({ message: 'Error importing results' });
    }
}
