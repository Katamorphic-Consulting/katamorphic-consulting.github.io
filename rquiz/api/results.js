// api/results.js

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { JSONBIN_API_KEY, JSONBIN_BIN_ID } = process.env;

    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        if (response.ok) {
            const data = await response.json();
            return { statusCode: 200, body: JSON.stringify(data.record) };
        } else {
            return { statusCode: response.status, body: JSON.stringify({ message: 'Error fetching results' }) };
        }
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Error fetching results' }) };
    }
};
