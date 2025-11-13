// api/submit.js

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    const { firstName, quizTitle, score, total } = request.body;
    const { JSONBIN_API_KEY, JSONBIN_BIN_ID } = process.env;

    // Fetch existing results from jsonbin.io
    let results = {};
    try {
        const fetchResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            results = data.record;
        }
    } catch (error) {
        return response.status(500).json({ message: 'Error fetching results' });
    }

    if (results[firstName] && results[firstName][quizTitle]) {
        return response.status(409).json({ message: 'You have already taken this quiz.' });
    }

    if (!results[firstName]) {
        results[firstName] = {};
    }
    results[firstName][quizTitle] = {
        score: score,
        total: total,
        submissionTime: new Date().toLocaleString()
    };

    // Save updated results to jsonbin.io
    try {
        await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify(results)
        });
        return response.status(200).json({ message: 'Results saved successfully' });
    } catch (error) {
        return response.status(500).json({ message: 'Error saving results' });
    }
}
