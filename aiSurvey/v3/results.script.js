/* results.script.js (v3 dashboard)
 *
 * GETs /api/v3-list (Vercel KV backend), filters defensively on
 * instrumentVersion === 'v3', and renders a dashboard organised by the
 * v3 sections.
 *
 * Reuses window.SURVEY_V3_SCHEMA (exposed by survey.js) so the question
 * text / option order / section structure stays in sync with the survey.
 */

document.addEventListener('DOMContentLoaded', async () => {
    if (!window.SURVEY_V3_SCHEMA) {
        showError("v3 schema not loaded. Make sure survey-v3.js is included before this script.");
        return;
    }
    const { sections } = window.SURVEY_V3_SCHEMA;

    const resultsContainer = document.getElementById('resultsContainer');
    const qualitativeContainer = document.getElementById('qualitativeContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage   = document.getElementById('errorMessage');
    const summaryStrip   = document.getElementById('summaryStrip');

    const timeRangeEl    = document.getElementById('timeRange');
    const startDateEl    = document.getElementById('startDate');
    const endDateEl      = document.getElementById('endDate');
    const applyDateRange = document.getElementById('applyDateRangeBtn');
    const modeRangeEl    = document.getElementById('modeRange');
    const attentionRangeEl = document.getElementById('attentionRange');
    const courseRangeEl  = document.getElementById('courseRange');

    let allV3 = [];

    /* Build lookup tables from the schema */
    const questionMeta = new Map(); // id -> { text, sectionTitle, optionOrder, isOpen, scale }
    sections.forEach(section => {
        section.questions.forEach(q => {
            const meta = {
                text: q.text,
                sectionTitle: section.title,
                sectionId: section.id,
                isOpen: q.type === 'textarea',
                isCodeBuilder: q.type === 'code_builder',
                optionOrder: null,
                attentionCheck: !!q.attentionCheck
            };
            if (section.matrix) {
                meta.optionOrder = section.matrix.scale;
                meta.scaleName = scaleName(section.matrix.scale);
            } else if (q.options) {
                meta.optionOrder = q.options;
            }
            questionMeta.set(q.id, meta);
        });
    });

    function scaleName(scale) {
        if (!scale || !scale.length) return '';
        if (scale[0] === 'Strongly disagree') return 'Likert agreement (5)';
        if (scale[0] === 'Never' && scale.length === 6) return 'Frequency (6)';
        if (scale[0] === 'Never' && scale.length === 5) return 'Frequency (5)';
        if (scale[0] === 'Definitely not acceptable') return 'Acceptability (5)';
        return '';
    }

    await fetchResults();

    timeRangeEl.addEventListener('change', () => {
        startDateEl.value = ''; endDateEl.value = '';
        render();
    });
    applyDateRange.addEventListener('click', () => {
        timeRangeEl.value = 'all';
        render();
    });
    modeRangeEl.addEventListener('change', render);
    attentionRangeEl.addEventListener('change', render);
    courseRangeEl.addEventListener('change', render);

    async function fetchResults() {
        showLoading(true);

        try {
            // Optional password gate: if /api/v3-list requires one, append ?password=…
            // by setting RESULTS_PASSWORD in your env vars and adjusting the URL here.
            const resp = await fetch('/api/v3-list');
            if (!resp.ok) {
                let detail = '';
                try { detail = (await resp.json()).detail || ''; } catch (_) {}
                throw new Error(`HTTP ${resp.status} ${resp.statusText}${detail ? ': ' + detail : ''}`);
            }
            const payload = await resp.json();
            const rows = Array.isArray(payload.rows) ? payload.rows : [];
            // Defensive: still filter on tag in case other rows ever land here.
            allV3 = rows.filter(r => r && r.instrumentVersion === 'v3');

            populateCourseFilter();

            if (!allV3.length) {
                resultsContainer.innerHTML = '<p class="no-data">No v3 responses found yet. Once a student submits through this survey, they will appear here.</p>';
                showLoading(false);
                return;
            }

            render();
        } catch (e) {
            showError(`An error occurred: ${e.message}`);
            console.error(e);
        } finally {
            showLoading(false);
        }
    }

    function populateCourseFilter() {
        const seen = new Set();
        allV3.forEach(r => { if (r.courseIdentifier) seen.add(r.courseIdentifier); });
        const courses = [...seen].sort();
        courseRangeEl.innerHTML = '<option value="all">All courses</option>' +
            courses.map(c => `<option value="${escapeAttr(c)}">${escapeHtml(c)}</option>`).join('');
    }

    function getFiltered() {
        let rows = [...allV3];

        const selectedRange = timeRangeEl.value;
        const startVal = startDateEl.value;
        const endVal   = endDateEl.value;

        if (startVal && endVal) {
            const start = new Date(startVal); start.setHours(0,0,0,0);
            const end   = new Date(endVal);   end.setHours(23,59,59,999);
            rows = rows.filter(r => withinDate(r.submittedAt, start, end));
        } else if (selectedRange !== 'all') {
            const now = new Date();
            const cutoff = new Date();
            if (selectedRange === '24h') cutoff.setDate(now.getDate() - 1);
            else if (selectedRange === '7d')  cutoff.setDate(now.getDate() - 7);
            else if (selectedRange === '30d') cutoff.setDate(now.getDate() - 30);
            rows = rows.filter(r => withinDate(r.submittedAt, cutoff, new Date(Date.now() + 1e9)));
        }

        if (modeRangeEl.value !== 'all') {
            rows = rows.filter(r => r.surveyMode === modeRangeEl.value);
        }
        if (attentionRangeEl.value === 'passed') {
            rows = rows.filter(r => r.attentionCheckPassed === true);
        } else if (attentionRangeEl.value === 'failed') {
            rows = rows.filter(r => r.attentionCheckPassed === false);
        }
        if (courseRangeEl.value !== 'all') {
            rows = rows.filter(r => r.courseIdentifier === courseRangeEl.value);
        }
        return rows;
    }

    function withinDate(iso, start, end) {
        if (!iso) return false;
        const d = new Date(iso);
        return d >= start && d <= end;
    }

    function render() {
        const filtered = getFiltered();
        renderSummary(filtered);
        renderSections(filtered);
        renderQualitative(filtered);
    }

    function renderSummary(rows) {
        const total = rows.length;
        const pre   = rows.filter(r => r.surveyMode === 'Start of course (pre)').length;
        const post  = rows.filter(r => r.surveyMode === 'End of course (post)').length;
        const oneoff = rows.filter(r => r.surveyMode === 'One-off / not part of a pre-post pair').length;
        const passed = rows.filter(r => r.attentionCheckPassed === true).length;
        const failed = rows.filter(r => r.attentionCheckPassed === false).length;
        const uniquePCs = new Set(rows.map(r => r.participantCode).filter(Boolean)).size;
        const paired = (() => {
            const codeToModes = new Map();
            rows.forEach(r => {
                if (!r.participantCode) return;
                if (!codeToModes.has(r.participantCode)) codeToModes.set(r.participantCode, new Set());
                codeToModes.get(r.participantCode).add(r.surveyMode);
            });
            let n = 0;
            for (const modes of codeToModes.values()) {
                if (modes.has('Start of course (pre)') && modes.has('End of course (post)')) n++;
            }
            return n;
        })();

        const cards = [
            { v: total,  l: 'Total v3 responses' },
            { v: pre,    l: 'Pre' },
            { v: post,   l: 'Post' },
            { v: oneoff, l: 'One-off' },
            { v: uniquePCs, l: 'Unique participant codes' },
            { v: paired,    l: 'Matched pre+post pairs' },
            { v: passed, l: 'Attention check passed' },
            { v: failed, l: 'Attention check failed', warn: failed > 0 }
        ];
        summaryStrip.classList.remove('hidden');
        summaryStrip.innerHTML = cards.map(c =>
            `<div class="summary-card${c.warn ? ' warn' : ''}">
                <div class="v">${c.v}</div>
                <div class="l">${c.l}</div>
            </div>`
        ).join('');
    }

    function renderSections(rows) {
        resultsContainer.innerHTML = '';
        if (!rows.length) {
            resultsContainer.innerHTML = '<p class="no-data">No responses match the current filters.</p>';
            return;
        }

        // Aggregate counts: questionId -> { answer -> count }
        const stats = aggregate(rows);

        sections.forEach(section => {
            const closedQs = section.questions.filter(q => q.type !== 'textarea' && q.type !== 'code_builder');
            if (!closedQs.length) return;

            const header = document.createElement('div');
            header.className = 'section-header';
            header.innerHTML = `<h2>${escapeHtml(section.title)}</h2>${section.description ? `<p>${escapeHtml(section.description)}</p>` : ''}`;
            resultsContainer.appendChild(header);

            closedQs.forEach(q => {
                const data = stats.get(q.id) || {};
                renderQuestionStat(q.id, data, rows.length);
            });
        });
    }

    function aggregate(rows) {
        const stats = new Map();
        rows.forEach(row => {
            const responses = row.responses || {};
            Object.entries(responses).forEach(([qid, ans]) => {
                if (!stats.has(qid)) stats.set(qid, {});
                const bucket = stats.get(qid);
                if (Array.isArray(ans)) {
                    ans.forEach(a => { bucket[a] = (bucket[a] || 0) + 1; });
                } else {
                    bucket[ans] = (bucket[ans] || 0) + 1;
                }
            });
        });
        return stats;
    }

    function renderQuestionStat(qid, counts, total) {
        const meta = questionMeta.get(qid);
        if (!meta || meta.isOpen || meta.isCodeBuilder) return;

        const block = document.createElement('div');
        block.classList.add('stat-block');

        const title = document.createElement('h3');
        title.textContent = meta.text;
        if (meta.scaleName) {
            const scale = document.createElement('span');
            scale.className = 'scale-marker';
            scale.textContent = `[${meta.scaleName}]`;
            title.appendChild(scale);
        }
        if (meta.attentionCheck) {
            const ac = document.createElement('span');
            ac.className = 'scale-marker';
            ac.textContent = '[attention check]';
            title.appendChild(ac);
        }
        block.appendChild(title);

        const list = document.createElement('div');
        list.classList.add('stat-results');

        let answers = Object.keys(counts);
        if (meta.optionOrder) {
            answers.sort((a, b) => {
                const ia = meta.optionOrder.indexOf(a);
                const ib = meta.optionOrder.indexOf(b);
                if (ia !== -1 && ib !== -1) return ia - ib;
                if (ia !== -1) return -1;
                if (ib !== -1) return 1;
                return a.localeCompare(b);
            });
        } else {
            answers.sort();
        }

        if (!answers.length) {
            list.innerHTML = '<div class="no-data">No answers yet for this question.</div>';
        } else {
            for (const ans of answers) {
                const count = counts[ans];
                const pct = total ? ((count / total) * 100).toFixed(1) : '0.0';
                const item = document.createElement('div');
                item.classList.add('stat-item');
                item.innerHTML = `
                    <div class="stat-label">${escapeHtml(ans)}</div>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${pct}%;"></div>
                    </div>
                    <div class="stat-value">${pct}% (${count})</div>
                `;
                list.appendChild(item);
            }
        }
        block.appendChild(list);
        resultsContainer.appendChild(block);
    }

    function renderQualitative(rows) {
        qualitativeContainer.innerHTML = '';
        const openIds = [];
        sections.forEach(s => s.questions.forEach(q => {
            if (q.type === 'textarea') openIds.push({ id: q.id, text: q.text, section: s.title });
        }));
        if (!openIds.length) return;

        const heading = document.createElement('h2');
        heading.textContent = 'Free-text responses';
        qualitativeContainer.appendChild(heading);

        openIds.forEach(({ id, text, section }) => {
            const responses = rows
                .map(r => ({ value: r.responses ? r.responses[id] : null, when: r.submittedAt, mode: r.surveyMode, course: r.courseIdentifier }))
                .filter(r => r.value && String(r.value).trim().length);

            const block = document.createElement('div');
            block.className = 'qualitative-block';
            const h3 = document.createElement('h3');
            h3.textContent = text;
            const sub = document.createElement('div');
            sub.style.color = '#888';
            sub.style.fontSize = '0.85em';
            sub.textContent = `${section} — ${responses.length} response${responses.length === 1 ? '' : 's'}`;
            block.appendChild(h3);
            block.appendChild(sub);

            if (!responses.length) {
                const empty = document.createElement('div');
                empty.className = 'no-data';
                empty.textContent = 'No responses yet.';
                block.appendChild(empty);
            } else {
                const details = document.createElement('details');
                details.open = responses.length <= 10;
                const summary = document.createElement('summary');
                summary.textContent = `Show all ${responses.length}`;
                details.appendChild(summary);

                responses.forEach(r => {
                    const item = document.createElement('div');
                    item.className = 'response-item';
                    const meta = document.createElement('div');
                    meta.className = 'meta';
                    const when = r.when ? new Date(r.when).toISOString().slice(0,10) : '(no date)';
                    meta.textContent = `${when} · ${r.mode || ''} · ${r.course || ''}`;
                    item.appendChild(meta);
                    item.appendChild(document.createTextNode(String(r.value)));
                    details.appendChild(item);
                });
                block.appendChild(details);
            }
            qualitativeContainer.appendChild(block);
        });
    }

    function showLoading(on) {
        loadingMessage.classList.toggle('hidden', !on);
    }

    function showError(msg) {
        errorMessage.textContent = msg;
        errorMessage.classList.remove('hidden');
    }

    function escapeHtml(s) {
        return String(s ?? '').replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }
    function escapeAttr(s) {
        return escapeHtml(s).replace(/`/g, '&#96;');
    }
});
