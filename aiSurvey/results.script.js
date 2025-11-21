const questions = [
    {
        type: "section",
        title: "GenAI use",
        description: "For each of these tasks, indicate how often you use Generative AI (GenAI) tools such as ChatGPT, Copilot, or Bard",
        questions: [
            {
                id: "genai_use_text",
                text: "Working with text (e.g., writing emails, reports, summaries)",
                type: "radio",
                options: ["Never", "Less often", "Monthly", "Weekly", "Daily"]
            },
            {
                id: "genai_use_images",
                text: "Generating images",
                type: "radio",
                options: ["Never", "Less often", "Monthly", "Weekly", "Daily"]
            },
            {
                id: "genai_use_code",
                text: "Generating Code (e.g., the solution to a programming problem, or part of it)",
                type: "radio",
                options: ["Never", "Less often", "Monthly", "Weekly", "Daily"]
            },
            {
                id: "genai_use_errors",
                text: "Finding and Fixing errors",
                type: "radio",
                options: ["Never", "Less often", "Monthly", "Weekly", "Daily"]
            },
            {
                id: "genai_use_feedback",
                text: "Getting Feedback",
                type: "radio",
                options: ["Never", "Less often", "Monthly", "Weekly", "Daily"]
            },
            {
                id: "genai_use_learning",
                text: "Learning about Topics and Concepts",
                type: "radio",
                options: ["Never", "Less often", "Monthly", "Weekly", "Daily"]
            },
            {
                id: "genai_stuck_first_step",
                text: "When you get stuck on a programming problem, what is your typical first step?",
                type: "radio",
                options: ["Consult course materials/textbook", "Ask a friend or classmate", "Search on Google/Stack Overflow", "Ask a Generative AI tool", "Contact the teacher/TA"]
            },
            {
                id: "genai_prompt_ability",
                text: "How do you rate your ability to write effective prompts to get the code or explanation you need?",
                type: "radio",
                options: ["Excellent", "Good", "Average", "Poor", "Very Poor"]
            }
        ]
    },
    {
        type: "section",
        title: "Agreement Statements",
        description: "Rate your level of agreement with the following statements:",
        questions: [
            {
                id: "agreement_hinders_learning",
                text: "Using GenAI tools frequently to generate code hinders my ability to learn programming.",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "agreement_over_reliant",
                text: "I am concerned that I will become overly reliant on GenAI tools.",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "agreement_genai_teachers",
                text: "GenAI tools can provide guidance for coursework as effectively as human teachers.",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            }
        ]
    },
    {
        type: "section",
        title: "Ethics and Policies",
        questions: [
            {
                id: "ethics_policies_clear",
                text: "The policies of my school/university are clear regarding what is allowed and not allowed regarding the use of Generative AI (GenAI) tools.",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "ethics_policy_general",
                text: "What is the general policy of your school/university on using GenAI tools in your studies?",
                type: "radio",
                options: ["Not allowed", "Allowed", "It depends. Please explain:", "I don't know"]
            },
            {
                id: "ethics_students_unapproved_use",
                text: "How many students at your school/university are using GenAI tools in ways that teachers would not approve of?",
                type: "radio",
                options: ["Almost no one", "Some", "Many", "Almost everyone"]
            }
        ]
    },
    {
        type: "section",
        title: "Ethical Actions",
        description: "If a course does not have a policy regarding the use of GenAI tools, which of the following actions do you consider ethical (something that is fair or that you would not feel guilty about)? (Select all that apply)",
        questions: [
            {
                id: "ethical_action_auto_generate_without_understanding",
                text: "Auto-generating a solution for the entire assignment and submitting it without understanding it.",
                type: "radio",
                options: ["Ethical", "Not Ethical"]
            },
            {
                id: "ethical_action_auto_generate_with_understanding",
                text: "Auto-generating a solution for the entire assignment and submitting it even after fully understanding it.",
                type: "radio",
                options: ["Ethical", "Not Ethical"]
            },
            {
                id: "ethical_action_auto_generate_small_parts",
                text: "Auto-generating solutions for small parts of the assignment.",
                type: "radio",
                options: ["Ethical", "Not Ethical"]
            },
            {
                id: "ethical_action_explain_problem",
                text: "Using GenAI tools to \"explain\" step-by-step how to solve a problem.",
                type: "radio",
                options: ["Ethical", "Not Ethical"]
            },
            {
                id: "ethical_action_fix_bug",
                text: "Providing your code to GenAI tools and asking them to help fix a bug.",
                type: "radio",
                options: ["Ethical", "Not Ethical"]
            },
            {
                id: "ethical_action_comment_tidy_improve",
                text: "Asking GenAI tools to comment, tidy, and improve the style of your code.",
                type: "radio",
                options: ["Ethical", "Not Ethical"]
            },
            {
                id: "ethical_action_other_language",
                text: "Writing the solution in a programming language other than the course's and asking GenAI to translate/adapt it.",
                type: "radio",
                options: ["Ethical", "Not Ethical"]
            },
            {
                id: "ethical_action_used_genai_not_supposed_to",
                text: "Have you used GenAI to help you with part or all of an assignment when you were not supposed to?",
                type: "radio",
                options: ["Never", "Sometimes", "Most of the time", "Always"]
            }
        ]
    },
    {
        type: "section",
        title: "Attitudes",
        description: "Rate your level of agreement with each of these statements:",
        questions: [
            {
                id: "attitude_trust_genai",
                text: "I trust what Generative AI (GenAI) generates (i.e., that it is accurate, reliable, appropriate)",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "attitude_change_edit_genai",
                text: "I change or edit what GenAI produces to suit my needs",
                type: "radio",
                options: ["Never", "Sometimes", "Most of the time", "Always"]
            },
            {
                id: "attitude_optimistic",
                text: "I am optimistic about GenAI",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "attitude_skeptical",
                text: "I am skeptical about GenAI",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "attitude_worried",
                text: "I am worried about GenAI",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "attitude_excited",
                text: "I am excited by GenAI",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "attitude_stressed",
                text: "I am stressed by GenAI",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "attitude_grateful",
                text: "I am grateful for GenAI",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "attitude_frightened",
                text: "I am frightened of GenAI",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "attitude_career_essential",
                text: "To what extent do you agree with this statement: 'Proficiency with AI programming tools will be essential for my future career'?",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            }
        ]
    },
    {
        type: "section",
        title: "Programming Course",
        description: "In the following questions, students were asked to think about a recent course in which they did programming or programming-related tasks",
        questions: [
            {
                id: "course_teacher_attitude",
                text: "What is your teacher's attitude towards using Generative AI (GenAI) tools?",
                type: "radio",
                options: ["Mostly positive", "Neutral or mixed", "Mostly negative", "I do not know"]
            },
            {
                id: "course_want_use_genai_easier_faster",
                text: "In this course, I want to use GenAI because it: Makes things easier or faster",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_want_use_genai_improves_quality",
                text: "In this course, I want to use GenAI because it: Improves the quality of my work",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_want_use_genai_helps_otherwise",
                text: "In this course, I want to use GenAI because it: Helps me do things I could not do otherwise",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_want_use_genai_improves_grades",
                text: "In this course, I want to use GenAI because it: Improves my grades",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_want_use_genai_more_confident",
                text: "In this course, I want to use GenAI because it: Helps me feel more confident",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_dont_want_use_genai_breaking_rules",
                text: "In this course, I don't want to use GenAI because: I am worried about breaking my school's rules",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_dont_want_use_genai_inaccurate",
                text: "In this course, I don't want to use GenAI because: It can be inaccurate or make things up",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_dont_want_use_genai_not_confident",
                text: "In this course, I don't want to use GenAI because: I do not know how to use it confidently",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_dont_want_use_genai_do_myself",
                text: "In this course, I don't want to use GenAI because: I want to do it myself",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_dont_want_use_genai_privacy_concerns",
                text: "In this course, I don't want to use GenAI because: I have privacy or ethical concerns",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_genai_significant_role",
                text: "GenAI tools have played a significant role in my learning process during this course",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_genai_accelerated_learning",
                text: "GenAI tools have accelerated my learning process in this course",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            },
            {
                id: "course_without_genai_same_amount",
                text: "Without GenAI, I believe I would have learned the same amount in this course",
                type: "radio",
                options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"]
            }
        ]
    }
];
const questionOptionsMap = new Map();
questions.forEach(section => {
    section.questions.forEach(question => {
        if (question.options) {
            questionOptionsMap.set(question.id, question.options);
        }
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    const resultsContainer = document.getElementById('resultsContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Base period elements
    const timeRange = document.getElementById('timeRange');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const applyDateRangeBtn = document.getElementById('applyDateRangeBtn');

    // Comparison period elements
    const comparisonTimeRange = document.getElementById('comparisonTimeRange');
    const comparisonStartDate = document.getElementById('comparisonStartDate');
    const comparisonEndDate = document.getElementById('comparisonEndDate');
    const applyComparisonDateRangeBtn = document.getElementById('applyComparisonDateRangeBtn');

    const compareBtn = document.getElementById('compareBtn');

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
            const binUrl = `https://api.jsonbin.io/v3/b/${jsonbinConfig.jsonbinBinId}`;
            const response = await fetch(binUrl, {
                headers: { 'X-Master-Key': jsonbinConfig.jsonbinSecretKey }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch bin data: ${response.status} ${response.statusText}`);
            }

            const binData = await response.json();
            allRawResponses = binData.record;

            if (!Array.isArray(allRawResponses) || allRawResponses.length === 0) {
                resultsContainer.innerHTML = '<p>No survey responses found in this bin, or the bin is empty.</p>';
                showLoading(false);
                return;
            }

            filterAndRenderResults();

        } catch (error) {
            showError(`An error occurred: ${error.message}`);
            console.error(error);
        } finally {
            showLoading(false);
        }
    }

    function getFilteredResponses(period) {
        let responses = [...allRawResponses];
        const timeRangeEl = period === 'base' ? timeRange : comparisonTimeRange;
        const startDateEl = period === 'base' ? startDate : comparisonStartDate;
        const endDateEl = period === 'base' ? endDate : comparisonEndDate;

        const selectedRange = timeRangeEl.value;
        const startVal = startDateEl.value;
        const endVal = endDateEl.value;

        if (startVal && endVal) {
            const cutoffStartDate = new Date(startVal);
            cutoffStartDate.setHours(0, 0, 0, 0);
            const cutoffEndDate = new Date(endVal);
            cutoffEndDate.setHours(23, 59, 59, 999);

            responses = responses.filter(response => {
                if (!response.submissionTimestamp) return false;
                const submissionDate = new Date(response.submissionTimestamp);
                return submissionDate >= cutoffStartDate && submissionDate <= cutoffEndDate;
            });
        } else if (selectedRange !== 'all') {
            const now = new Date();
            const cutoffDate = new Date();

            if (selectedRange === '24h') cutoffDate.setDate(now.getDate() - 1);
            else if (selectedRange === '7d') cutoffDate.setDate(now.getDate() - 7);
            else if (selectedRange === '30d') cutoffDate.setDate(now.getDate() - 30);

            responses = responses.filter(response => {
                if (!response.submissionTimestamp) return false;
                const submissionDate = new Date(response.submissionTimestamp);
                return submissionDate >= cutoffDate;
            });
        }
        return responses;
    }

    function filterAndRenderResults() {
        const baseResponses = getFilteredResponses('base');
        
        resultsContainer.innerHTML = '';
        if (baseResponses.length === 0) {
            resultsContainer.innerHTML = '<p>No responses found for the selected time range.</p>';
            return;
        }

        processAndRenderStats(baseResponses);
    }

    function processStats(responses) {
        const stats = {};
        const totalResponses = responses.length;

        responses.forEach(response => {
            if (!response) return;
            for (const [questionId, answer] of Object.entries(response)) {
                if (!stats[questionId]) stats[questionId] = {};
                if (Array.isArray(answer)) {
                    answer.forEach(a => {
                        stats[questionId][a] = (stats[questionId][a] || 0) + 1;
                    });
                } else {
                    stats[questionId][answer] = (stats[questionId][answer] || 0) + 1;
                }
            }
        });
        return { stats, totalResponses };
    }

    function processAndRenderStats(responses) {
        const { stats, totalResponses } = processStats(responses);
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

        let sortedAnswers = Object.keys(questionData);
        const optionOrder = questionOptionsMap.get(questionId);
        if (optionOrder) {
            sortedAnswers.sort((a, b) => {
                const indexA = optionOrder.indexOf(a);
                const indexB = optionOrder.indexOf(b);
                if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                }
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
                return a.localeCompare(b);
            });
        } else {
            sortedAnswers.sort((a, b) => a.localeCompare(b));
        }

        for (const answer of sortedAnswers) {
            const count = questionData[answer];
            const percentage = totalResponses > 0 ? ((count / totalResponses) * 100).toFixed(1) : 0;
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

    function compareResults() {
        const baseResponses = getFilteredResponses('base');
        const comparisonResponses = getFilteredResponses('comparison');

        resultsContainer.innerHTML = '';
        if (baseResponses.length === 0 && comparisonResponses.length === 0) {
            resultsContainer.innerHTML = '<p>No responses found for the selected time ranges.</p>';
            return;
        }

        processAndRenderComparison(baseResponses, comparisonResponses);
    }

    function processAndRenderComparison(baseResponses, comparisonResponses) {
        const { stats: baseStats, totalResponses: baseTotal } = processStats(baseResponses);
        const { stats: compStats, totalResponses: compTotal } = processStats(comparisonResponses);

        const legend = `
            <div class="legend">
                <div class="legend-item"><span class="legend-color" style="background-color: #007bff;"></span> Base Period (${baseTotal} responses)</div>
                <div class="legend-item"><span class="legend-color" style="background-color: #ff7f50;"></span> Comparison Period (${compTotal} responses)</div>
            </div>
        `;
        resultsContainer.innerHTML = `<h2>Comparison View</h2>${legend}`;

        const allQuestionIds = new Set([...Object.keys(baseStats), ...Object.keys(compStats)]);

        allQuestionIds.forEach(questionId => {
            const baseQuestionData = baseStats[questionId] || {};
            const compQuestionData = compStats[questionId] || {};
            renderComparisonStat(questionId, baseQuestionData, baseTotal, compQuestionData, compTotal);
        });
    }

    function renderComparisonStat(questionId, baseData, baseTotal, compData, compTotal) {
        const questionText = getQuestionTextById(questionId);
        if (!questionText || questionId === 'submissionTimestamp' || questionId === 'userAgent' || questionId === 'screenResolution' || questionId === 'language') {
            return; // Skip metadata fields in comparison view
        }

        const statBlock = document.createElement('div');
        statBlock.classList.add('stat-block');
        const title = document.createElement('h3');
        title.textContent = questionText;
        statBlock.appendChild(title);
        const resultsDiv = document.createElement('div');
        resultsDiv.classList.add('stat-results');

        let allAnswers = Array.from(new Set([...Object.keys(baseData), ...Object.keys(compData)]));
        const optionOrder = questionOptionsMap.get(questionId);

        if (optionOrder) {
            allAnswers.sort((a, b) => {
                const indexA = optionOrder.indexOf(a);
                const indexB = optionOrder.indexOf(b);
                if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                }
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
                return a.localeCompare(b);
            });
        } else {
            allAnswers.sort((a, b) => a.localeCompare(b));
        }

        allAnswers.forEach(answer => {
            const baseCount = baseData[answer] || 0;
            const compCount = compData[answer] || 0;
            const basePercentage = baseTotal > 0 ? ((baseCount / baseTotal) * 100).toFixed(1) : 0;
            const compPercentage = compTotal > 0 ? ((compCount / compTotal) * 100).toFixed(1) : 0;

            const resultItem = document.createElement('div');
            resultItem.classList.add('stat-item', 'comparison-item');
            resultItem.innerHTML = `
                <div class="stat-label">${answer}</div>
                <div class="stat-bar-container">
                    <div class="stat-bar base-bar" style="width: ${basePercentage}%;" title="Base: ${basePercentage}% (${baseCount})"></div>
                    <div class="stat-bar comp-bar" style="width: ${compPercentage}%;" title="Comparison: ${compPercentage}% (${compCount})"></div>
                </div>
                <div class="stat-value-group">
                    <div class="stat-value base-value">${basePercentage}% (${baseCount})</div>
                    <div class="stat-value comp-value">${compPercentage}% (${compCount})</div>
                </div>
            `;
            resultsDiv.appendChild(resultItem);
        });

        statBlock.appendChild(resultsDiv);
        resultsContainer.appendChild(statBlock);
    }

    function getQuestionTextById(id) {
        const questionMap = {};
        questions.forEach(section => {
            section.questions.forEach(q => { questionMap[q.id] = q.text; });
        });
        questionMap["submissionTimestamp"] = "Submission Time";
        questionMap["userAgent"] = "Browser Type";
        questionMap["screenResolution"] = "Screen Resolution";
        questionMap["language"] = "Language";
        return questionMap[id] || id.replace(/_/g, ' ');
    }

    function showLoading(isLoading) {
        loadingMessage.style.display = isLoading ? 'block' : 'none';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Event Listeners
    applyDateRangeBtn.addEventListener('click', () => {
        timeRange.value = 'all';
        filterAndRenderResults();
    });
    timeRange.addEventListener('change', () => {
        startDate.value = '';
        endDate.value = '';
        filterAndRenderResults();
    });
    applyComparisonDateRangeBtn.addEventListener('click', () => {
        comparisonTimeRange.value = 'all';
        compareResults();
    });
    comparisonTimeRange.addEventListener('change', () => {
        comparisonStartDate.value = '';
        comparisonEndDate.value = '';
        compareResults();
    });
    compareBtn.addEventListener('click', compareResults);

    fetchResults();
});

