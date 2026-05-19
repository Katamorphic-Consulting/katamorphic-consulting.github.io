// api/delete.js

export default async function handler(request, response) {
    if (request.method !== 'DELETE') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    const { JSONBIN_API_KEY, JSONBIN_BIN_ID, RESULTS_PASSWORD } = process.env;
    const { password, firstName } = request.query;

    if (password !== RESULTS_PASSWORD) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    if (!firstName) {
        return response.status(400).json({ message: 'firstName is required' });
    }

    try {
        const fetchResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: { 'X-Master-Key': JSONBIN_API_KEY }
        });
        if (!fetchResponse.ok) {
            return response.status(500).json({ message: 'Error fetching results' });
        }
        const data = await fetchResponse.json();
        const results = data.record;

        if (!results[firstName]) {
            return response.status(404).json({ message: 'Student not found' });
        }

        delete results[firstName];

        const putResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify(results)
        });

        if (!putResponse.ok) {
            return response.status(500).json({ message: 'Error saving results' });
        }

        return response.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        return response.status(500).json({ message: 'Error deleting student' });
    }
}
