// api/results.js

export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    const { JSONBIN_API_KEY, JSONBIN_BIN_ID, RESULTS_PASSWORD } = process.env;
    const { password } = request.query;

    // Check password
    if (password !== RESULTS_PASSWORD) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const fetchResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            const results = data.record;
            const mergedResults = {};

            for (const firstName in results) {
                const existingName = Object.keys(mergedResults).find(key => key.toLowerCase() === firstName.toLowerCase());
                if (existingName) {
                    // Merge the quiz results
                    Object.assign(mergedResults[existingName], results[firstName]);
                } else {
                    // Add the new entry
                    mergedResults[firstName] = results[firstName];
                }
            }

            return response.status(200).json(mergedResults);
        } else {
            return response.status(fetchResponse.status).json({ message: 'Error fetching results' });
        }
    } catch (error) {
        return response.status(500).json({ message: 'Error fetching results' });
    }
}
