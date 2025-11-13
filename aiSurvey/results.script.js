document.addEventListener('DOMContentLoaded', async () => {
    const loadResultsBtn = document.getElementById('loadResultsBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');

    let jsonbinConfig = {};

    try {
        const configResponse = await fetch('/api/config');
        if (!configResponse.ok) {
            throw new Error('Could not load configuration.');
        }
        jsonbinConfig = await configResponse.json();
    } catch (error) {
        showError(`Error: ${error.message} Please ensure you have set up your environment variables on Vercel.`);
        loadResultsBtn.disabled = true;
        loadResultsBtn.textContent = 'Configuration Error';
        return; // Stop execution if config fails
    }

    async function fetchResults() {
        if (!jsonbinConfig.jsonbinSecretKey || !jsonbinConfig.jsonbinCollectionId) {
            showError("Configuration is missing. Please set environment variables on Vercel.");
            return;
        }

        showLoading(true);
        errorMessage.style.display = 'none';
        resultsContainer.innerHTML = ''; // Clear previous results

        try {
            // 1. Fetch the list of all bins in the collection
            const collectionUrl = `https://api.jsonbin.io/v3/c/${jsonbinConfig.jsonbinCollectionId}/bins`;
            const collectionResponse = await fetch(collectionUrl, {
                headers: {
                    'X-Master-Key': jsonbinConfig.jsonbinSecretKey
                }
            });

            if (!collectionResponse.ok) {
                throw new Error(`Failed to fetch collection data: ${collectionResponse.status} ${collectionResponse.statusText}`);
            }

            const bins = await collectionResponse.json();

            if (bins.length === 0) {
                resultsContainer.innerHTML = '<p>No survey responses found in this collection.</p>';
                showLoading(false);
                return;
            }

            // 2. Fetch the content of each bin
            const binFetchPromises = bins.map(bin =>
                fetch(`https://api.jsonbin.io/v3/b/${bin.record}`, {
                    headers: { 'X-Master-Key': jsonbinConfig.jsonbinSecretKey }
                }).then(res => {
                    if (!res.ok) {
                        console.error(`Failed to fetch bin ${bin.record}`);
                        return null; // Return null for failed fetches
                    }
                    return res.json();
                })
            );

            const results = await Promise.all(binFetchPromises);

            // 3. Render the results
            results.forEach((result, index) => {
                if (result) { // Check if the fetch was successful
                    const responseData = result.record;
                    const responseId = bins[index].record; // Use the bin ID as the response ID
                    renderResultCard(responseData, responseId);
                }
            });

        } catch (error) {
            showError(`An error occurred: ${error.message}`);
            console.error(error);
        } finally {
            showLoading(false);
        }
    }

    function renderResultCard(data, responseId) {
        const card = document.createElement('div');
        card.classList.add('result-card');

        const title = document.createElement('h3');
        title.textContent = `Response ID: ${responseId.substring(0, 8)}...`;
        card.appendChild(title);

        for (const [questionId, answer] of Object.entries(data)) {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer');

            const questionText = getQuestionTextById(questionId); // Helper to get full question text

            answerDiv.innerHTML = `
                <strong>${questionText || questionId}:</strong>
                <span>${Array.isArray(answer) ? answer.join(', ') : answer}</span>
            `;
            card.appendChild(answerDiv);
        }

        resultsContainer.appendChild(card);
    }

    function getQuestionTextById(id) {
        // This is a simplified mapping. For a real app, you might fetch this from a shared source.
        const questionMap = {
            "genai_use_text": "Working with text",
            "genai_use_images": "Generating images",
            "genai_use_code": "Generating Code",
            "genai_use_errors": "Finding and Fixing errors",
            "genai_use_feedback": "Getting Feedback",
            "genai_use_learning": "Learning about Topics and Concepts",
            "agreement_hinders_learning": "Hinders my ability to learn programming",
            "agreement_over_reliant": "Concerned about becoming overly reliant",
            "agreement_genai_teachers": "GenAI as effective as human teachers",
            // Add other question IDs and their text here for better display
        };
        return questionMap[id] || id.replace(/_/g, ' ');
    }

    function showLoading(isLoading) {
        loadingMessage.style.display = isLoading ? 'block' : 'none';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    loadResultsBtn.addEventListener('click', fetchResults);
});
