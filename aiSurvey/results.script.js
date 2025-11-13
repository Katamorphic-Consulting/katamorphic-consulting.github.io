document.addEventListener('DOMContentLoaded', () => {
    const loadResultsBtn = document.getElementById('loadResultsBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');

    // IMPORTANT: Replace with your JSONBin.io Master Key and Collection ID
    const JSONBIN_MASTER_KEY = "$2a$10$YOUR_JSONBIN_SECRET_KEY"; // Replace with your actual Master Key
    const JSONBIN_COLLECTION_ID = "YOUR_COLLECTION_ID"; // Replace with the ID of the collection you created

    async function fetchResults() {
        // Basic validation
        if (JSONBIN_MASTER_KEY === "$2a$10$YOUR_JSONBIN_SECRET_KEY" || JSONBIN_COLLECTION_ID === "YOUR_COLLECTION_ID") {
            showError("Please update `results.script.js` with your JSONBin.io Master Key and Collection ID.");
            return;
        }

        showLoading(true);
        errorMessage.classList.add('hidden');
        resultsContainer.innerHTML = ''; // Clear previous results

        try {
            // 1. Fetch the list of all bins in the collection
            const collectionUrl = `https://api.jsonbin.io/v3/c/${JSONBIN_COLLECTION_ID}/bins`;
            const collectionResponse = await fetch(collectionUrl, {
                headers: {
                    'X-Master-Key': JSONBIN_MASTER_KEY
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
                    headers: { 'X-Master-Key': JSONBIN_MASTER_KEY }
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
        loadingMessage.classList.toggle('hidden', !isLoading);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    loadResultsBtn.addEventListener('click', fetchResults);
});
