// api/submit.js

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { studentNumber, studentName, quizTitle, score, total } = JSON.parse(event.body);
    const { JSONBIN_API_KEY, JSONBIN_BIN_ID } = process.env;

    // Fetch existing results from jsonbin.io
    let results = {};
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        if (response.ok) {
            const data = await response.json();
            results = data.record;
        }
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Error fetching results' }) };
    }

    if (results[studentNumber] && results[studentNumber][quizTitle]) {
        return { statusCode: 409, body: JSON.stringify({ message: 'You have already taken this quiz.' }) };
    }

    if (!results[studentNumber]) {
        results[studentNumber] = {
            name: studentName
        };
    }
    results[studentNumber][quizTitle] = {
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
        return { statusCode: 200, body: JSON.stringify({ message: 'Results saved successfully' }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Error saving results' }) };
    }
};
