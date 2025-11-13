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
                options: ["Daily", "Weekly", "Monthly", "Less often", "Never"]
            },
            {
                id: "genai_use_images",
                text: "Generating images",
                type: "radio",
                options: ["Daily", "Weekly", "Monthly", "Less often", "Never"]
            },
            {
                id: "genai_use_code",
                text: "Generating Code (e.g., the solution to a programming problem, or part of it)",
                type: "radio",
                options: ["Daily", "Weekly", "Monthly", "Less often", "Never"]
            },
            {
                id: "genai_use_errors",
                text: "Finding and Fixing errors",
                type: "radio",
                options: ["Daily", "Weekly", "Monthly", "Less often", "Never"]
            },
            {
                id: "genai_use_feedback",
                text: "Getting Feedback",
                type: "radio",
                options: ["Daily", "Weekly", "Monthly", "Less often", "Never"]
            },
            {
                id: "genai_use_learning",
                text: "Learning about Topics and Concepts",
                type: "radio",
                options: ["Daily", "Weekly", "Monthly", "Less often", "Never"]
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
                options: ["Very Poor", "Poor", "Average", "Good", "Excellent"]
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
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "agreement_over_reliant",
                text: "I am concerned that I will become overly reliant on GenAI tools.",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "agreement_genai_teachers",
                text: "GenAI tools can provide guidance for coursework as effectively as human teachers.",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
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
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
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
                options: ["Almost everyone", "Many", "Some", "Almost no one"]
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
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
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
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "attitude_skeptical",
                text: "I am skeptical about GenAI",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "attitude_worried",
                text: "I am worried about GenAI",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "attitude_excited",
                text: "I am excited by GenAI",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "attitude_stressed",
                text: "I am stressed by GenAI",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "attitude_grateful",
                text: "I am grateful for GenAI",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "attitude_frightened",
                text: "I am frightened of GenAI",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "attitude_career_essential",
                text: "To what extent do you agree with this statement: 'Proficiency with AI programming tools will be essential for my future career'?",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
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
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_want_use_genai_improves_quality",
                text: "In this course, I want to use GenAI because it: Improves the quality of my work",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_want_use_genai_helps_otherwise",
                text: "In this course, I want to use GenAI because it: Helps me do things I could not do otherwise",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_want_use_genai_improves_grades",
                text: "In this course, I want to use GenAI because it: Improves my grades",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_want_use_genai_more_confident",
                text: "In this course, I want to use GenAI because it: Helps me feel more confident",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_dont_want_use_genai_breaking_rules",
                text: "In this course, I don't want to use GenAI because: I am worried about breaking my school's rules",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_dont_want_use_genai_inaccurate",
                text: "In this course, I don't want to use GenAI because: It can be inaccurate or make things up",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_dont_want_use_genai_not_confident",
                text: "In this course, I don't want to use GenAI because: I do not know how to use it confidently",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_dont_want_use_genai_do_myself",
                text: "In this course, I don't want to use GenAI because: I want to do it myself",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_dont_want_use_genai_privacy_concerns",
                text: "In this course, I don't want to use GenAI because: I have privacy or ethical concerns",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_genai_significant_role",
                text: "GenAI tools have played a significant role in my learning process during this course",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_genai_accelerated_learning",
                text: "GenAI tools have accelerated my learning process in this course",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            },
            {
                id: "course_without_genai_same_amount",
                text: "Without GenAI, I believe I would have learned the same amount in this course",
                type: "radio",
                options: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"]
            }
        ]
    }
];

document.addEventListener('DOMContentLoaded', async () => {
    const questionsContainer = document.getElementById('questionsContainer');
    const surveyForm = document.getElementById('surveyForm');
    const responseMessage = document.getElementById('responseMessage');

    // Modal elements
    const modal = document.getElementById('confirmationModal');
    const closeButton = document.querySelector('.close-button');
    const completionSummary = document.getElementById('completionSummary');

    let jsonbinConfig = {};

    try {
        const configResponse = await fetch('/api/config');
        if (!configResponse.ok) {
            throw new Error('Could not load configuration.');
        }
        jsonbinConfig = await configResponse.json();
    } catch (error) {
        showError(`Error: ${error.message} Please ensure you have set up your environment variables on Vercel.`);
        // Disable the form if config fails
        const submitButton = surveyForm.querySelector('button[type="submit"]');
        if(submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Configuration Error';
        }
    }


    function getTotalQuestions() {
        return questions.reduce((total, section) => total + section.questions.length, 0);
    }

    function renderQuestions() {
        questions.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('question-group');

            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = section.title;
            sectionDiv.appendChild(sectionTitle);

            if (section.description) {
                const sectionDescription = document.createElement('p');
                sectionDescription.textContent = section.description;
                sectionDiv.appendChild(sectionDescription);
            }

            section.questions.forEach(q => {
                const questionItemDiv = document.createElement('div');
                questionItemDiv.classList.add('question-item');
                // Add a data attribute to easily find the element
                questionItemDiv.dataset.questionId = q.id;

                const questionLabel = document.createElement('label');
                questionLabel.textContent = q.text;
                questionItemDiv.appendChild(questionLabel);

                if (q.type === "radio") {
                    const radioGroupDiv = document.createElement('div');
                    radioGroupDiv.classList.add('radio-group');
                    q.options.forEach(option => {
                        const radioLabel = document.createElement('label');
                        const radioInput = document.createElement('input');
                        radioInput.type = "radio";
                        radioInput.name = q.id;
                        radioInput.value = option;
                        radioLabel.appendChild(radioInput);
                        radioLabel.appendChild(document.createTextNode(option));
                        radioGroupDiv.appendChild(radioLabel);
                    });
                    questionItemDiv.appendChild(radioGroupDiv);
                } else if (q.type === "checkbox") {
                    const checkboxGroupDiv = document.createElement('div');
                    checkboxGroupDiv.classList.add('checkbox-group');
                    q.options.forEach(option => {
                        const checkboxLabel = document.createElement('label');
                        const checkboxInput = document.createElement('input');
                        checkboxInput.type = "checkbox";
                        checkboxInput.name = q.id;
                        checkboxInput.value = option;
                        checkboxLabel.appendChild(checkboxInput);
                        checkboxLabel.appendChild(document.createTextNode(option));
                        checkboxGroupDiv.appendChild(checkboxLabel);
                    });
                    questionItemDiv.appendChild(checkboxGroupDiv);
                }
                sectionDiv.appendChild(questionItemDiv);
            });
            questionsContainer.appendChild(sectionDiv);
        });
    }

    function validateSurvey(formData) {
        let isValid = true;
        questions.forEach(section => {
            section.questions.forEach(q => {
                if (!formData.has(q.id)) {
                    isValid = false;
                    const questionElement = document.querySelector(`.question-item[data-question-id="${q.id}"]`);
                    if (questionElement) {
                        questionElement.classList.add('highlight');
                    }
                }
            });
        });
        return isValid;
    }

    function showError(message) {
        responseMessage.textContent = message;
        responseMessage.className = "error";
        responseMessage.classList.add('is-visible');
    }

    surveyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Clear previous highlights and errors
        document.querySelectorAll('.question-item.highlight').forEach(el => el.classList.remove('highlight'));
        responseMessage.classList.remove('is-visible');

        const formData = new FormData(surveyForm);

        // Validate the form
        if (!validateSurvey(formData)) {
            showError("Please answer all highlighted questions before submitting.");
            const firstError = document.querySelector('.question-item.highlight');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        if (!jsonbinConfig.jsonbinSecretKey || !jsonbinConfig.jsonbinBinId) {
            showError("Configuration is missing. Please set JSONBIN_SECRET_KEY and JSONBIN_BIN_ID environment variables on Vercel.");
            return;
        }

        const newAnswer = {};
        for (let [name, value] of formData.entries()) {
            if (name in newAnswer) {
                if (!Array.isArray(newAnswer[name])) {
                    newAnswer[name] = [newAnswer[name]];
                }
                newAnswer[name].push(value);
            } else {
                newAnswer[name] = value;
            }
        }

        // Add metadata to the submission
        newAnswer.submissionTimestamp = new Date().toISOString();
        newAnswer.userAgent = navigator.userAgent;
        newAnswer.screenResolution = `${screen.width}x${screen.height}`;
        newAnswer.language = navigator.language;

        console.log("Collected Answer:", newAnswer);

        const binUrl = `https://api.jsonbin.io/v3/b/${jsonbinConfig.jsonbinBinId}`;
        const headers = {
            'Content-Type': 'application/json',
            'X-Master-Key': jsonbinConfig.jsonbinSecretKey
        };

        try {
            // 1. GET the current bin content
            const getResponse = await fetch(binUrl, { headers });
            if (!getResponse.ok) {
                throw new Error(`Failed to fetch existing data from the bin. Status: ${getResponse.status}`);
            }
            const binData = await getResponse.json();
            let existingResponses = binData.record;

            if (!Array.isArray(existingResponses)) {
                existingResponses = [];
            }

            // 2. Append the new answer
            existingResponses.push(newAnswer);

            // 3. PUT the updated content back
            const putResponse = await fetch(binUrl, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(existingResponses)
            });

            if (!putResponse.ok) {
                throw new Error(`Failed to update the bin. Status: ${putResponse.status}`);
            }

            // Success
            const answeredCount = Object.keys(newAnswer).length - 4; // Subtract metadata fields
            const totalQuestions = getTotalQuestions();
            completionSummary.textContent = `You have answered ${answeredCount} out of ${totalQuestions} questions.`;
            modal.classList.add('is-visible');

        } catch (error) {
            console.error("Error updating bin:", error);
            showError(`An error occurred: ${error.message}`);
        }
    });

    surveyForm.addEventListener('change', (event) => {
        const questionItem = event.target.closest('.question-item');
        if (questionItem && questionItem.classList.contains('highlight')) {
            questionItem.classList.remove('highlight');
        }
    });

    function closeModal() {
        modal.classList.remove('is-visible');
        surveyForm.reset();
    }

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    renderQuestions();
});
