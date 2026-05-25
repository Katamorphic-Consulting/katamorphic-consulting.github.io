/* survey-v3.js — research-grade instrument, broadened population
 *
 * Changes vs. v2:
 *  - Population is now any university/college student, not only programming
 *    students. Programming background is collected as a moderator variable
 *    (see RQ on moderation in paper-draft-v3.md).
 *  - Affect items replaced with the ATAI-5 validated short scale
 *    (Sindermann et al., 2021) — 0% wording overlap with the v1 instrument and
 *    cleanly citable.
 *  - Ethics scenarios re-framed around an *intent / disclosure / stage* axis
 *    rather than a *task-type* axis — a different conceptual structure from
 *    the original instrument.
 *  - Policy section expanded with an encouragement / requirement axis,
 *    reflecting that many students are now actively asked or required to use
 *    GenAI rather than only choosing to.
 *  - New items capture how students feel about being required or encouraged
 *    to use GenAI (autonomy, pressure).
 */

const LIKERT5 = ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"];
const FREQ6   = ["Never", "Less than monthly", "Monthly", "Weekly", "Daily", "Multiple times daily"];
const ACCEPT5 = ["Definitely not acceptable", "Probably not acceptable", "Unsure", "Probably acceptable", "Definitely acceptable"];
const NEVER5  = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const sections = [
    /* -------------------------------------------------------------------- */
    { id: "meta", title: "About this response", description:
        "These items help us link pre- and post-course responses without identifying you.",
      questions: [
        { id: "survey_mode", type: "radio", required: true,
          text: "Which version of the survey are you taking?",
          options: ["Start of course (pre)", "End of course (post)", "One-off / not part of a pre-post pair"] },
        { id: "course_identifier", type: "text", required: true,
          text: "Which course or learning context are you answering about? (e.g., \"Bachelor Year 2 — Research Methods\")",
          placeholder: "Course name and year (any subject)" },
        { id: "course_involves_coding", type: "radio", required: true,
          text: "Does this course involve any programming or data analysis?",
          options: [
            "Yes — programming is the main focus",
            "Yes — programming or data analysis is part of it but not the main focus",
            "No, but the course uses digital tools (spreadsheets, simulators, etc.)",
            "No — no programming or computational work"
          ] },
        { id: "participant_code", type: "code_builder", required: true,
          text: "Self-generated participant code",
          note: "We combine three things you'll remember the same way next time. Nobody but you can reconstruct it.",
          parts: [
            { id: "code_p1", label: "First two letters of your mother's first name (e.g., MA for Maria)", maxlength: 2 },
            { id: "code_p2", label: "Day of your birth, two digits (e.g., 07)", maxlength: 2 },
            { id: "code_p3", label: "Last two digits of your phone number", maxlength: 2 }
          ]
        }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "demographics", title: "About you",
      description: "Background characteristics. \"Prefer not to say\" is available for every item.",
      preOnly: true,
      questions: [
        { id: "age_range", type: "radio", required: true,
          text: "Age range:",
          options: ["Under 18", "18–20", "21–23", "24–26", "27 or older", "Prefer not to say"] },
        { id: "gender", type: "radio", required: true,
          text: "Gender:",
          options: ["Woman", "Man", "Non-binary", "Self-describe / Other", "Prefer not to say"] },
        { id: "year_of_study", type: "radio", required: true,
          text: "Level of study:",
          options: ["Bachelor — Year 1", "Bachelor — Year 2", "Bachelor — Year 3", "Bachelor — Year 4+", "Master's", "PhD", "Other"] },
        { id: "field_of_study", type: "radio", required: true,
          text: "Broad field of study:",
          options: [
            "Computing / Data Science / AI",
            "Engineering (non-computing)",
            "Natural sciences (physics, chemistry, biology, etc.)",
            "Social sciences (psychology, sociology, economics, etc.)",
            "Humanities (history, languages, philosophy, etc.)",
            "Health and life sciences (medicine, nursing, public health, etc.)",
            "Arts and design",
            "Business and management",
            "Education",
            "Law",
            "Other / Interdisciplinary"
          ] }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "programming_background", title: "Programming background",
      description: "Even if you are not a computing student, your prior experience with programming may influence how you use AI tools. \"None\" is a normal and useful answer.",
      preOnly: true,
      questions: [
        { id: "pb_years_coding", type: "radio", required: true,
          text: "How long have you been writing code (in any language, any context)?",
          options: ["I have never written code", "Less than 1 year", "1–3 years", "3–5 years", "More than 5 years"] },
        { id: "pb_proficiency", type: "radio", required: true,
          text: "How would you rate your overall programming proficiency right now?",
          options: ["1 — None / Beginner", "2", "3 — Intermediate", "4", "5 — Advanced"] },
        { id: "pb_languages", type: "checkbox", required: true,
          text: "Which programming or data-analysis languages have you used at any level? (Select all that apply; pick the last option if none.)",
          options: [
            "Python", "R", "JavaScript / TypeScript", "Java", "C / C++", "C#",
            "SQL", "HTML / CSS", "MATLAB", "SPSS / Stata syntax",
            "Excel formulas / macros (treated as code by you)",
            "Other",
            "I have not used any of these"
          ] },
        { id: "pb_formal_training", type: "radio", required: true,
          text: "Most accurate description of your formal programming education:",
          options: [
            "None",
            "One or two short courses",
            "A programming-related minor or specialisation within a non-computing degree",
            "A computing major or full degree",
            "Postgraduate study in a computing-related field"
          ] },
        { id: "pb_hours_per_week", type: "radio", required: true,
          text: "In a typical week THIS term, how many hours do you spend writing code (for any reason)?",
          options: ["0 — I do not write code", "Less than 1 hour", "1–5 hours", "5–20 hours", "More than 20 hours"] },
        { id: "pb_prior_genai_months", type: "radio", required: true,
          text: "How long have you been using generative AI tools at all (for any task)?",
          options: ["Never used them", "Less than 3 months", "3–12 months", "1–2 years", "More than 2 years"] }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "tools_used", title: "Which tools do you use?",
      description: "Select every tool you have used at least once for study-related tasks.",
      questions: [
        { id: "tools_list", type: "checkbox", required: true,
          text: "GenAI tools used for study-related tasks (select all that apply):",
          options: [
            "ChatGPT (any version)", "Claude", "Gemini / Bard", "GitHub Copilot",
            "Cursor", "Codeium / Windsurf", "Microsoft Copilot",
            "Perplexity",
            "A locally hosted model (Ollama, LM Studio, etc.)",
            "Other", "I have not used any GenAI tool for study"
          ] }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "usage_frequency", title: "How often you use GenAI for each task",
      description: "For each task, indicate how often you currently use a GenAI tool. Skip a row mentally if it's not relevant to your studies, but please mark \"Never\" rather than leaving it blank.",
      matrix: { scale: FREQ6 },
      questions: [
        { id: "freq_write_text",     type: "matrix_row", text: "Writing or editing prose (emails, essays, reports, reflections)" },
        { id: "freq_summarise",      type: "matrix_row", text: "Summarising readings or lecture material" },
        { id: "freq_brainstorm",     type: "matrix_row", text: "Brainstorming ideas or planning an assignment" },
        { id: "freq_explain_concept",type: "matrix_row", text: "Asking it to explain a concept I'm learning" },
        { id: "freq_generate_code",  type: "matrix_row", text: "Generating new code from a description" },
        { id: "freq_debug",          type: "matrix_row", text: "Diagnosing errors or fixing bugs in code" },
        { id: "freq_data_analysis",  type: "matrix_row", text: "Help with data analysis or statistics" },
        { id: "freq_translate",      type: "matrix_row", text: "Translating between languages (natural or programming)" },
        { id: "freq_study_quiz",     type: "matrix_row", text: "Practising / quizzing myself for an exam" },
        { id: "freq_feedback",       type: "matrix_row", text: "Getting feedback on something I produced myself" }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "help_seeking", title: "When you get stuck",
      description: "When you hit a coursework problem you cannot immediately solve, how often do you turn to each of these sources?",
      matrix: { scale: NEVER5 },
      questions: [
        { id: "help_textbook",      type: "matrix_row", text: "Course materials / textbook / lecture notes" },
        { id: "help_classmate",     type: "matrix_row", text: "A friend or classmate" },
        { id: "help_search",        type: "matrix_row", text: "Search engine / documentation / Wikipedia" },
        { id: "help_genai",         type: "matrix_row", text: "A GenAI tool" },
        { id: "help_teacher",       type: "matrix_row", text: "The teacher or teaching assistant" },
        { id: "help_just_try",      type: "matrix_row", text: "Keep trying on my own without external help" }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "self_efficacy", title: "Confidence in using GenAI",
      description: "Rate your agreement with each statement.",
      matrix: { scale: LIKERT5 },
      questions: [
        { id: "se_prompt",          type: "matrix_row", text: "I can write a prompt that gets me the answer or explanation I need." },
        { id: "se_iterate",         type: "matrix_row", text: "When the first answer is wrong, I can iterate on my prompt to fix it." },
        { id: "se_judge",           type: "matrix_row", text: "I can judge whether what a GenAI tool produces is correct." },
        { id: "se_adapt",           type: "matrix_row", text: "I can adapt GenAI output to fit the specific requirements of my assignment." },
        { id: "se_explain_back",    type: "matrix_row", text: "I can explain GenAI-generated material back to someone else in my own words." }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "verification", title: "How you handle GenAI output",
      description: "Rate how often each statement describes what you actually do.",
      matrix: { scale: NEVER5 },
      questions: [
        { id: "verify_read_through",type: "matrix_row", text: "I read through GenAI output carefully before using it." },
        { id: "verify_run_test",    type: "matrix_row", text: "If it produces code, I run or test it before submitting." },
        { id: "verify_modify",      type: "matrix_row", text: "I modify GenAI output rather than copying it verbatim." },
        { id: "verify_cross_check", type: "matrix_row", text: "I cross-check GenAI claims against another source." },
        { id: "verify_paste_blind", type: "matrix_row", text: "I paste GenAI output straight into my assignment without changes.",
          reverseCoded: true, note: "Reverse-coded relative to the items above." }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "tam_usefulness", title: "Perceived usefulness for your learning",
      description: "Thinking about THIS course specifically:",
      matrix: { scale: LIKERT5 },
      questions: [
        { id: "pu_useful_overall",  type: "matrix_row", text: "Using GenAI in this course is useful to me." },
        { id: "pu_faster",          type: "matrix_row", text: "Using GenAI lets me finish coursework faster." },
        { id: "pu_understand",      type: "matrix_row", text: "Using GenAI helps me understand the material better." },
        { id: "pu_better_quality",  type: "matrix_row", text: "Using GenAI improves the quality of the work I submit." }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "tam_ease", title: "Perceived ease of use",
      matrix: { scale: LIKERT5 },
      questions: [
        { id: "peu_easy",           type: "matrix_row", text: "GenAI tools are easy for me to use." },
        { id: "peu_clear",          type: "matrix_row", text: "It is clear and understandable how to get useful answers from GenAI tools." },
        { id: "peu_skill_low",      type: "matrix_row", text: "I do not need much skill to use GenAI tools effectively." }
      ]
    },

    /* -------------------------------------------------------------------- */
    /* ATAI-5: validated short scale (Sindermann et al., 2021). Items
     * reproduced as published, with permission for non-commercial research
     * use. Cite: Sindermann, C., Sha, P., Zhou, M., Wernicke, J., Schmitt,
     * H. S., Li, M., Sariyska, R., Stavrou, M., Becker, B., & Montag, C.
     * (2021). Assessing the attitude towards artificial intelligence:
     * Introduction of a short measure. KI - Künstliche Intelligenz, 35(1),
     * 109–118. Original scale is 0–10; we use 5-point Likert to match the
     * rest of the instrument; this is a known acceptable adaptation. */
    { id: "atai", title: "General attitudes towards AI",
      description: "Rate your agreement with each statement.",
      citeNote: "Items adapted from the ATAI scale (Sindermann et al., 2021).",
      matrix: { scale: LIKERT5 },
      questions: [
        { id: "atai_fear",         type: "matrix_row", text: "I fear artificial intelligence." },
        { id: "atai_trust",        type: "matrix_row", text: "I trust artificial intelligence." },
        { id: "atai_destroy",      type: "matrix_row", text: "Artificial intelligence will destroy mankind." },
        { id: "atai_benefit",      type: "matrix_row", text: "Artificial intelligence will benefit mankind." },
        { id: "atai_job_loss",     type: "matrix_row", text: "Artificial intelligence will cause many job losses." }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "trust_use", title: "Trust in your own use",
      description: "These items are about your use of GenAI for studies, not AI in general.",
      matrix: { scale: LIKERT5 },
      questions: [
        { id: "trust_accurate_use",  type: "matrix_row", text: "When I use GenAI for studies, what it produces is usually accurate." },
        { id: "trust_known_wrong",   type: "matrix_row", text: "I have personally seen GenAI confidently produce something incorrect." },
        { id: "trust_calibration",   type: "matrix_row", text: "I usually know when a GenAI answer is likely to be wrong." }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "learning_beliefs", title: "Beliefs about your learning",
      description: "Thinking about THIS course:",
      matrix: { scale: LIKERT5 },
      questions: [
        { id: "lb_helps_learn",     type: "matrix_row", text: "Using GenAI helps me learn the material in this course." },
        { id: "lb_skips_learn",     type: "matrix_row", text: "Using GenAI lets me finish work without actually learning the material." },
        { id: "lb_long_term",       type: "matrix_row", text: "In the long run, I will be a better student because GenAI tools exist." },
        { id: "lb_dependency",      type: "matrix_row", text: "I worry I will become too dependent on GenAI." },
        { id: "lb_attention_check", type: "matrix_row", text: "This is an attention check — please choose \"Somewhat agree\".",
          attentionCheck: true, expected: "Somewhat agree" },
        { id: "lb_without_same",    type: "matrix_row", text: "Without GenAI, I would have learned the same amount in this course.",
          reverseCoded: true }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "policy_and_encouragement", title: "Course expectations about GenAI",
      description: "Many courses now actively encourage or require GenAI use rather than ban it. These items capture where this course sits.",
      questions: [
        { id: "policy_stance", type: "radio", required: true,
          text: "Which best describes how GenAI use is treated in THIS course?",
          options: [
            "Required — students must use AI tools",
            "Strongly encouraged — the lecturer actively pushes us to use AI",
            "Encouraged — the course suggests using AI",
            "Allowed if disclosed or cited",
            "Allowed for some tasks (e.g., debugging) but not others",
            "Allowed without specific guidance",
            "Discouraged but not banned",
            "Banned",
            "There is no policy stated",
            "I don't know"
          ] },
        { id: "policy_clarity", type: "radio", required: true,
          text: "How clear is the GenAI policy for this course to you?",
          options: ["Very unclear", "Somewhat unclear", "Neutral", "Somewhat clear", "Very clear"] },
        { id: "norm_peer_use", type: "radio", required: true,
          text: "Roughly what proportion of your classmates do you think use GenAI on assessed work in this course?",
          options: ["Almost none", "A minority", "About half", "A majority", "Almost everyone", "I don't know"] },

        { id: "exp_required_courses_count", type: "radio", required: true,
          text: "Across ALL the courses you've taken so far, in how many were you REQUIRED to use GenAI?",
          options: ["None", "One course", "A few courses", "Most courses", "All my courses"] },
        { id: "exp_encouraged_courses_count", type: "radio", required: true,
          text: "Across ALL the courses you've taken so far, in how many were you ENCOURAGED (but not required) to use GenAI?",
          options: ["None", "One course", "A few courses", "Most courses", "All my courses"] }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "autonomy_and_pressure", title: "How required / encouraged use feels to you",
      description: "Only relevant if you have ever been asked or required to use GenAI in a course. If never, just mark \"Strongly disagree\" / \"Not applicable\".",
      matrix: { scale: LIKERT5 },
      questions: [
        { id: "aut_prefer_choose",       type: "matrix_row", text: "I would prefer to choose for myself whether to use GenAI, rather than have it required." },
        { id: "aut_required_helpful",    type: "matrix_row", text: "When GenAI use has been required, it was genuinely helpful to my learning." },
        { id: "aut_pressured",           type: "matrix_row", text: "I have felt pressured to use GenAI when I would have preferred not to." },
        { id: "aut_pressured_peers",     type: "matrix_row", text: "I have felt pressured to use GenAI because my classmates were using it." },
        { id: "aut_encouragement_legit", type: "matrix_row", text: "When a lecturer encourages GenAI use, that feels like legitimate teaching, not just permission." },
        { id: "aut_required_unfair",     type: "matrix_row", text: "Required GenAI use is unfair to students who do not want to use AI." }
      ]
    },

    /* -------------------------------------------------------------------- */
    /* INTENT / DISCLOSURE / STAGE axis ethics scenarios — completely different
     * structure from the v1 task-type axis (whole / part / explain / debug /
     * tidy / translate). Each scenario fixes some combination of:
     *   - stage of work (studying vs drafting vs final submission)
     *   - effort (with vs without own revision)
     *   - disclosure (disclosed vs silent)
     *   - compliance with stated policy (within vs outside policy)
     */
    { id: "ethics_acceptability", title: "Acceptability of specific behaviours",
      description: "Rate how acceptable each scenario is to you, in general.",
      matrix: { scale: ACCEPT5 },
      questions: [
        { id: "eth_study_then_solo", type: "matrix_row",
          text: "Using GenAI to help understand the material BEFORE an assignment, then completing the assignment without GenAI." },
        { id: "eth_draft_revise_disclose", type: "matrix_row",
          text: "Using GenAI for a first draft, substantially revising it yourself, and submitting it WITH disclosure." },
        { id: "eth_draft_revise_silent", type: "matrix_row",
          text: "Using GenAI for a first draft, substantially revising it yourself, and submitting WITHOUT disclosure." },
        { id: "eth_verbatim_disclose", type: "matrix_row",
          text: "Submitting GenAI output essentially verbatim, but disclosing that you did." },
        { id: "eth_verbatim_silent", type: "matrix_row",
          text: "Submitting GenAI output essentially verbatim, without disclosing." },
        { id: "eth_within_policy", type: "matrix_row",
          text: "Using GenAI in a course that allows it, in the way the course intended." },
        { id: "eth_outside_policy_study_only", type: "matrix_row",
          text: "In a course that forbids GenAI: using it only to study and revise, not on the submitted work." },
        { id: "eth_outside_policy_submit", type: "matrix_row",
          text: "In a course that forbids GenAI: using it on the submitted work anyway." },
        { id: "eth_required_against_will", type: "matrix_row",
          text: "Using GenAI heavily on a course that requires it, even though you'd rather not have." }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "self_reported_behaviour", title: "Your actual use in this course",
      description: "Best honest estimate. Remember: responses are anonymous.",
      questions: [
        { id: "behav_freq_assessed", type: "radio", required: true,
          text: "On assessed work in this course, how often did you use GenAI in any form?",
          options: NEVER5 },
        { id: "behav_disclose",      type: "radio", required: true,
          text: "When you used GenAI on assessed work, how often did you disclose or cite that use (if disclosure was expected)?",
          options: [...NEVER5, "Not applicable — disclosure was never expected"] },
        { id: "behav_against_rules", type: "radio", required: true,
          text: "Have you used GenAI on part or all of an assignment when you were NOT supposed to?",
          options: NEVER5 },
        { id: "behav_under_use", type: "radio", required: true,
          text: "Have you AVOIDED using GenAI on an assignment even though the course encouraged or required it?",
          options: [...NEVER5, "Not applicable — never required or encouraged"] }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "career", title: "Career outlook",
      matrix: { scale: LIKERT5 },
      questions: [
        { id: "car_essential",   type: "matrix_row", text: "Proficiency with AI tools will be essential for my future career." },
        { id: "car_replaced",    type: "matrix_row", text: "I worry that AI will reduce the demand for the kind of work I am training for." },
        { id: "car_advantage",   type: "matrix_row", text: "Being good at using AI tools will give me an advantage over peers who are not." }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "open_ended", title: "In your own words",
      description: "Short answers are fine — even one sentence is valuable.",
      questions: [
        { id: "open_helped",  type: "textarea", required: false,
          text: "Describe one moment in this course where GenAI helped your learning." },
        { id: "open_hurt",    type: "textarea", required: false,
          text: "Describe one moment where GenAI hurt your learning or got in your way." },
        { id: "open_required",type: "textarea", required: false,
          text: "If GenAI use was required or strongly encouraged in this course, how did you feel about that?" },
        { id: "open_change",  type: "textarea", required: false,
          text: "What would you change about how GenAI is handled in this course?" }
      ]
    },

    /* -------------------------------------------------------------------- */
    { id: "post_reflection", title: "End-of-course reflection",
      description: "Only shown if you indicated this is the post (end-of-course) survey.",
      postOnly: true,
      questions: [
        { id: "post_view_changed", type: "radio", required: false,
          text: "Compared to the start of the course, my overall view of GenAI in my studies has:",
          options: ["Become much more negative", "Become somewhat more negative", "Not changed", "Become somewhat more positive", "Become much more positive"] },
        { id: "post_skills_changed", type: "radio", required: false,
          text: "Compared to the start of the course, my ability to use GenAI effectively has:",
          options: ["Decreased", "Stayed about the same", "Improved a little", "Improved a lot"] },
        { id: "post_activity_useful", type: "radio", required: false,
          text: "If the course included a specific activity about GenAI (e.g., a workshop, a prompting exercise, a critique-the-output task), how useful was it?",
          options: ["Not useful", "Slightly useful", "Moderately useful", "Very useful", "Extremely useful", "There was no such activity"] },
        { id: "post_required_reflection", type: "radio", required: false,
          text: "If GenAI was required or encouraged in this course, looking back, how do you feel about that requirement/encouragement?",
          options: ["Very negative", "Somewhat negative", "Neutral", "Somewhat positive", "Very positive", "Not applicable"] },
        { id: "post_activity_describe", type: "textarea", required: false,
          text: "Briefly describe the GenAI-related activity that stood out most this term, and what you took away from it." }
      ]
    }
];

/* ============================================================ */
/* Rendering — same engine as v2; section.citeNote support added. */
/* ============================================================ */

// Expose schema globally so the results page (which also loads this file) can read it.
window.SURVEY_V3_SCHEMA = { sections, LIKERT5, FREQ6, ACCEPT5, NEVER5 };

document.addEventListener('DOMContentLoaded', async () => {
    // Skip survey UI setup if this file is loaded on a non-survey page (e.g. results).
    if (!document.getElementById('surveyForm')) return;

    const consentScreen   = document.getElementById('consentScreen');
    const consentCheckbox = document.getElementById('consentCheckbox');
    const consentContinue = document.getElementById('consentContinue');
    const surveyForm      = document.getElementById('surveyForm');
    const responseMessage = document.getElementById('responseMessage');
    const questionsContainer = document.getElementById('questionsContainer');
    const progressFill    = document.getElementById('progressFill');

    const modal = document.getElementById('confirmationModal');
    const closeButton = document.querySelector('.close-button');
    const completionSummary = document.getElementById('completionSummary');

    // No credentials needed: submissions POST to /api/v3-submit, which stores
    // the row in Netlify Blobs server-side.

    consentCheckbox.addEventListener('change', () => {
        consentContinue.disabled = !consentCheckbox.checked;
    });

    consentContinue.addEventListener('click', () => {
        consentScreen.classList.add('hidden');
        surveyForm.classList.remove('hidden');
        renderQuestions();
        updateProgress();
    });

    function renderQuestions() {
        sections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('question-group');
            sectionDiv.dataset.sectionId = section.id;
            if (section.postOnly) sectionDiv.classList.add('post-only', 'hidden');
            if (section.preOnly)  sectionDiv.classList.add('pre-only');

            const h = document.createElement('h3');
            h.textContent = section.title;
            sectionDiv.appendChild(h);

            if (section.description) {
                const p = document.createElement('p');
                p.className = 'section-intro';
                p.textContent = section.description;
                sectionDiv.appendChild(p);
            }

            if (section.citeNote) {
                const c = document.createElement('p');
                c.className = 'cite-note';
                c.textContent = section.citeNote;
                sectionDiv.appendChild(c);
            }

            if (section.matrix) {
                const nCols = section.matrix.scale.length;
                const header = document.createElement('div');
                header.className = 'likert-header';
                header.style.setProperty('--n-cols', nCols);
                const spacer = document.createElement('div');
                spacer.className = 'likert-spacer';
                header.appendChild(spacer);
                section.matrix.scale.forEach(opt => {
                    const c = document.createElement('div');
                    c.textContent = opt;
                    header.appendChild(c);
                });
                sectionDiv.appendChild(header);

                section.questions.forEach(q => {
                    const row = document.createElement('div');
                    row.className = 'likert-row question-item';
                    row.style.setProperty('--n-cols', nCols);
                    row.dataset.questionId = q.id;
                    if (q.attentionCheck) row.classList.add('attention-check');

                    const labelEl = document.createElement('label');
                    labelEl.className = 'likert-label';
                    labelEl.textContent = q.text;
                    row.appendChild(labelEl);

                    section.matrix.scale.forEach(opt => {
                        const cell = document.createElement('div');
                        cell.className = 'likert-option';
                        cell.dataset.optionLabel = opt;
                        const input = document.createElement('input');
                        input.type = 'radio';
                        input.name = q.id;
                        input.value = opt;
                        cell.appendChild(input);
                        row.appendChild(cell);
                    });
                    sectionDiv.appendChild(row);

                    if (q.note) {
                        const noteEl = document.createElement('div');
                        noteEl.className = 'question-note';
                        noteEl.textContent = q.note;
                        sectionDiv.appendChild(noteEl);
                    }
                });
            } else {
                section.questions.forEach(q => renderStandardQuestion(q, sectionDiv));
            }

            questionsContainer.appendChild(sectionDiv);
        });

        const modeRadios = document.getElementsByName('survey_mode');
        modeRadios.forEach(r => r.addEventListener('change', applyModeVisibility));
        applyModeVisibility();
    }

    function renderStandardQuestion(q, sectionDiv) {
        const item = document.createElement('div');
        item.classList.add('question-item');
        item.dataset.questionId = q.id;

        const label = document.createElement('label');
        label.textContent = q.text;
        item.appendChild(label);

        if (q.note) {
            const n = document.createElement('div');
            n.className = 'question-note';
            n.textContent = q.note;
            item.appendChild(n);
        }

        if (q.type === 'radio') {
            const group = document.createElement('div');
            group.className = 'radio-group';
            q.options.forEach(opt => {
                const lbl = document.createElement('label');
                const inp = document.createElement('input');
                inp.type = 'radio';
                inp.name = q.id;
                inp.value = opt;
                lbl.appendChild(inp);
                lbl.appendChild(document.createTextNode(opt));
                group.appendChild(lbl);
            });
            item.appendChild(group);
        } else if (q.type === 'checkbox') {
            const group = document.createElement('div');
            group.className = 'checkbox-group';
            q.options.forEach(opt => {
                const lbl = document.createElement('label');
                const inp = document.createElement('input');
                inp.type = 'checkbox';
                inp.name = q.id;
                inp.value = opt;
                lbl.appendChild(inp);
                lbl.appendChild(document.createTextNode(opt));
                group.appendChild(lbl);
            });
            item.appendChild(group);
        } else if (q.type === 'text') {
            const inp = document.createElement('input');
            inp.type = 'text';
            inp.name = q.id;
            if (q.placeholder) inp.placeholder = q.placeholder;
            item.appendChild(inp);
        } else if (q.type === 'textarea') {
            const ta = document.createElement('textarea');
            ta.name = q.id;
            item.appendChild(ta);
        } else if (q.type === 'code_builder') {
            const wrap = document.createElement('div');
            wrap.className = 'code-builder';
            q.parts.forEach(part => {
                const lbl = document.createElement('label');
                lbl.textContent = part.label;
                const inp = document.createElement('input');
                inp.type = 'text';
                inp.name = part.id;
                inp.maxLength = part.maxlength;
                inp.style.marginLeft = '8px';
                inp.style.width = '60px';
                inp.dataset.codePart = '1';
                lbl.appendChild(inp);
                wrap.appendChild(lbl);
            });
            const preview = document.createElement('div');
            preview.className = 'code-preview';
            preview.textContent = '—';
            wrap.appendChild(preview);
            wrap.addEventListener('input', () => {
                const parts = [...wrap.querySelectorAll('input[data-code-part]')].map(i => (i.value || '').toUpperCase());
                preview.textContent = parts.every(p => p) ? parts.join('-') : '—';
            });
            item.appendChild(wrap);
        }

        sectionDiv.appendChild(item);
    }

    function applyModeVisibility() {
        const mode = document.querySelector('input[name="survey_mode"]:checked')?.value;
        document.querySelectorAll('.post-only').forEach(el => {
            el.classList.toggle('hidden', mode !== 'End of course (post)');
        });
        document.querySelectorAll('.pre-only').forEach(el => {
            el.classList.toggle('hidden', mode === 'End of course (post)');
        });
        updateProgress();
    }

    function updateProgress() {
        const visibleRequired = [...document.querySelectorAll('.question-item')]
            .filter(el => !el.closest('.hidden'));
        if (!visibleRequired.length) { progressFill.style.width = '0%'; return; }
        const answered = visibleRequired.filter(el => {
            const inputs = el.querySelectorAll('input, textarea');
            return [...inputs].some(i => {
                if (i.type === 'radio' || i.type === 'checkbox') return i.checked;
                return (i.value || '').trim().length > 0;
            });
        }).length;
        const pct = Math.round((answered / visibleRequired.length) * 100);
        progressFill.style.width = pct + '%';
    }

    surveyForm.addEventListener('change', updateProgress);
    surveyForm.addEventListener('input',  updateProgress);

    surveyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        document.querySelectorAll('.question-item.highlight').forEach(el => el.classList.remove('highlight'));
        responseMessage.classList.remove('is-visible');

        const formData = new FormData(surveyForm);
        const missing = [];

        sections.forEach(section => {
            const sectionEl = document.querySelector(`[data-section-id="${section.id}"]`);
            if (!sectionEl || sectionEl.classList.contains('hidden')) return;
            section.questions.forEach(q => {
                if (q.required === false) return;
                if (q.type === 'code_builder') {
                    const parts = q.parts.map(p => formData.get(p.id));
                    if (parts.some(p => !p)) missing.push(q.id);
                } else if (q.type === 'checkbox') {
                    if (!formData.getAll(q.id).length) missing.push(q.id);
                } else {
                    if (!formData.get(q.id)) missing.push(q.id);
                }
            });
        });

        if (missing.length) {
            missing.forEach(id => {
                const el = document.querySelector(`.question-item[data-question-id="${id}"]`);
                if (el) el.classList.add('highlight');
            });
            showError(`Please answer all highlighted questions (${missing.length} remaining).`);
            const first = document.querySelector('.question-item.highlight');
            if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const payload = collectPayload(formData);

        try {
            const res = await fetch('/api/v3-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                let detail = '';
                try { detail = (await res.json()).detail || ''; } catch (_) {}
                throw new Error(`Submit failed (HTTP ${res.status})${detail ? ': ' + detail : ''}`);
            }

            const totalQuestions = countTotalQuestions(payload);
            const answered = Object.keys(payload.responses || {}).length;
            completionSummary.textContent = `You answered ${answered} of ${totalQuestions} applicable questions.`;
            modal.classList.add('is-visible');
        } catch (err) {
            console.error(err);
            showError(`Submission error: ${err.message}`);
        }
    });

    function collectPayload(formData) {
        const responses = {};
        for (const [name, value] of formData.entries()) {
            if (name in responses) {
                if (!Array.isArray(responses[name])) responses[name] = [responses[name]];
                responses[name].push(value);
            } else {
                responses[name] = value;
            }
        }

        const p1 = (responses.code_p1 || '').toUpperCase();
        const p2 = (responses.code_p2 || '').toUpperCase();
        const p3 = (responses.code_p3 || '').toUpperCase();
        const participantCode = `${p1}-${p2}-${p3}`;
        delete responses.code_p1; delete responses.code_p2; delete responses.code_p3;

        const attentionPass = responses.lb_attention_check === 'Somewhat agree';

        return {
            instrumentVersion: 'v3',
            participantCode,
            surveyMode: responses.survey_mode,
            courseIdentifier: responses.course_identifier,
            attentionCheckPassed: attentionPass,
            submittedAt: new Date().toISOString(),
            language: navigator.language,
            responses
        };
    }

    function countTotalQuestions(payload) {
        const mode = payload.surveyMode;
        return sections.reduce((total, s) => {
            if (s.postOnly && mode !== 'End of course (post)') return total;
            if (s.preOnly  && mode === 'End of course (post)') return total;
            return total + s.questions.length;
        }, 0);
    }

    function showError(msg) {
        responseMessage.textContent = msg;
        responseMessage.className = 'error';
        responseMessage.classList.add('is-visible');
    }

    closeButton.addEventListener('click', () => {
        modal.classList.remove('is-visible');
        surveyForm.reset();
        progressFill.style.width = '0%';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('is-visible');
    });
});
