document.addEventListener('DOMContentLoaded', async () => {
    const loadResultsBtn = document.getElementById('loadResultsBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const timeRange = document.getElementById('timeRange');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const applyDateRangeBtn = document.getElementById('applyDateRangeBtn');

    let jsonbinConfig = {};
    let allRawResponses = []; // Cache for the fetched data

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

    const timeRange = document.getElementById('timeRange');
    let allRawResponses = []; // Cache for the fetched data

    async function fetchResults() {
        if (!jsonbinConfig.jsonbinSecretKey || !jsonbinConfig.jsonbinBinId) {
            showError("Configuration is missing. Please set JSONBIN_SECRET_KEY and JSONBIN_BIN_ID environment variables on Vercel.");
            return;
        }

        showLoading(true);
        errorMessage.style.display = 'none';
        resultsContainer.innerHTML = ''; // Clear previous results

        try {
            // Fetch the content of the single bin
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
            allRawResponses = binData.record; // Cache the data

            if (!Array.isArray(allRawResponses) || allRawResponses.length === 0) {
                resultsContainer.innerHTML = '<p>No survey responses found in this bin, or the bin is empty.</p>';
                showLoading(false);
                return;
            }

            // Initial render
            filterAndRenderResults();

        } catch (error) {
            showError(`An error occurred: ${error.message}`);
            console.error(error);
        } finally {
            showLoading(false);
        }
    }

    function filterAndRenderResults() {
        let responsesToRender = [...allRawResponses];
        const selectedRange = timeRange.value;
        const startVal = startDate.value;
        const endVal = endDate.value;

        if (startVal && endVal) {
            const cutoffStartDate = new Date(startVal);
            cutoffStartDate.setHours(0, 0, 0, 0); // Start of the day
            const cutoffEndDate = new Date(endVal);
            cutoffEndDate.setHours(23, 59, 59, 999); // End of the day

            responsesToRender = responsesToRender.filter(response => {
                if (!response.submissionTimestamp) return false;
                const submissionDate = new Date(response.submissionTimestamp);
                return submissionDate >= cutoffStartDate && submissionDate <= cutoffEndDate;
            });
            
        } else if (selectedRange !== 'all') {
            const now = new Date();
            const cutoffDate = new Date();

            if (selectedRange === '24h') {
                cutoffDate.setDate(now.getDate() - 1);
            } else if (selectedRange === '7d') {
                cutoffDate.setDate(now.getDate() - 7);
            } else if (selectedRange === '30d') {
                cutoffDate.setDate(now.getDate() - 30);
            }

            responsesToRender = responsesToRender.filter(response => {
                if (!response.submissionTimestamp) return false;
                const submissionDate = new Date(response.submissionTimestamp);
                return submissionDate >= cutoffDate;
            });
        }
        
        resultsContainer.innerHTML = ''; // Clear previous results before re-rendering
        if (responsesToRender.length === 0) {
            resultsContainer.innerHTML = '<p>No responses found for the selected time range.</p>';
            return;
        }


        processAndRenderStats(responsesToRender);
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
            "attitude_career_essential": "AI proficiency essential for career",
            "genai_stuck_first_step": "First step when stuck on programming problem",
            "genai_prompt_ability": "Ability to write effective prompts",
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
    timeRange.addEventListener('change', () => {
        startDate.value = '';
        endDate.value = '';
        filterAndRenderResults();
    });
    applyDateRangeBtn.addEventListener('click', () => {
        timeRange.value = 'all';
        filterAndRenderResults();
    });
});
