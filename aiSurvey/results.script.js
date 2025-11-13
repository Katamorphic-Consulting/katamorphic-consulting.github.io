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
        if (!jsonbinConfig.jsonbinSecretKey || !jsonbinConfig.jsonbinBinId) {
            showError("Configuration is missing. Please set JSONBIN_SECRET_KEY and JSONBIN_BIN_ID environment variables on Vercel.");
            return;
        }

        showLoading(true);
        errorMessage.style.display = 'none';
        resultsContainer.innerHTML = ''; // Clear previous results

        try {
            // 1. Fetch the content of the single bin
            const binUrl = `https://api.jsonbin.io/v3/b/${jsonbinConfig.jsonbinBinId}`;
            const response = await fetch(binUrl, {
                headers: {
                    'X-Master-Key': jsonbinConfig.jsonbinSecretKey
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch bin data: ${response.status} ${response.statusText}`);
            }

            const binData = await response.json();
            const allResponses = binData.record; // The data is in the 'record' property

            if (!Array.isArray(allResponses) || allResponses.length === 0) {
                resultsContainer.innerHTML = '<p>No survey responses found in this bin, or the bin is empty.</p>';
                showLoading(false);
                return;
            }

            // 2. Process and render the results as statistics
            processAndRenderStats(allResponses);

        } catch (error) {
            showError(`An error occurred: ${error.message}`);
            console.error(error);
        } finally {
            showLoading(false);
        }
    }

    function processAndRenderStats(allResponses) {
        const stats = {};
        const totalResponses = allResponses.length;

        // Aggregate the data
        allResponses.forEach(response => {
            if (!response) return;
            for (const [questionId, answer] of Object.entries(response)) {
                if (!stats[questionId]) {
                    stats[questionId] = {};
                }
                if (Array.isArray(answer)) { // Handle checkboxes (if any)
                    answer.forEach(a => {
                        stats[questionId][a] = (stats[questionId][a] || 0) + 1;
                    });
                } else {
                    stats[questionId][answer] = (stats[questionId][answer] || 0) + 1;
                }
            }
        });

        // Render the aggregated data
        resultsContainer.innerHTML = `<h2>Total Responses: ${totalResponses}</h2>`;
        for (const [questionId, questionData] of Object.entries(stats)) {
            renderQuestionStat(questionId, questionData, totalResponses);
        }
    }

    function renderQuestionStat(questionId, questionData, totalResponses) {
        const questionText = getQuestionTextById(questionId);

        const statBlock = document.createElement('div');
        statBlock.classList.add('stat-block');

        const title = document.createElement('h3');
        title.textContent = questionText;
        statBlock.appendChild(title);

        const resultsDiv = document.createElement('div');
        resultsDiv.classList.add('stat-results');

        for (const [answer, count] of Object.entries(questionData)) {
            const percentage = ((count / totalResponses) * 100).toFixed(1);
            const resultItem = document.createElement('div');
            resultItem.classList.add('stat-item');

            resultItem.innerHTML = `
                <div class="stat-label">${answer}</div>
                <div class="stat-bar-container">
                    <div class="stat-bar" style="width: ${percentage}%;"></div>
                </div>
                <div class="stat-value">${percentage}% (${count})</div>
            `;
            resultsDiv.appendChild(resultItem);
        }

        statBlock.appendChild(resultsDiv);
        resultsContainer.appendChild(statBlock);
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
            "submissionTimestamp": "Submission Time",
            "userAgent": "Browser Type",
            "screenResolution": "Screen Resolution",
            "language": "Language",
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
