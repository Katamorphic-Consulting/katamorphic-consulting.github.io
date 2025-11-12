// api/results.js

export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    const { JSONBIN_API_KEY, JSONBIN_BIN_ID } = process.env;

    try {
        const fetchResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            return response.status(200).json(data.record);
        } else {
            return response.status(fetchResponse.status).json({ message: 'Error fetching results' });
        }
    } catch (error) {
        return response.status(500).json({ message: 'Error fetching results' });
    }
}