const quizForm = document.getElementById('quiz-form');
const quizTitle = document.querySelector('h1').textContent;

const answers = {
    "R Quiz - Part 1": {
        "q1": { "answer": "a", "explanation": "`getwd()` stands for 'get working directory'." },
        "q2": { "answer": "b", "explanation": "`<-` is the conventional assignment operator in R. While `=` can also be used, `<-` is preferred for clarity and historical reasons." },
        "q3": { "answer": "b", "explanation": "`c()` stands for 'combine' or 'concatenate', and it's used to create vectors." },
        "q4": { "answer": "c", "explanation": "`install.packages()` is the function to install packages from CRAN." },
        "q5": { "answer": "d", "explanation": "Both `library()` and `require()` can be used to load packages. `library()` is generally preferred for scripts, while `require()` is often used inside functions." },
        "q6": { "answer": "b", "explanation": "R performs element-wise operations on vectors of the same length." },
        "q7": { "answer": "c", "explanation": "Both `help(function_name)` and `?function_name` are used to access the help documentation for a function." },
        "q8": { "answer": "c", "explanation": "`TRUE` and `FALSE` are logical values in R." },
        "q9": { "answer": "c", "explanation": "Both `1:10` and `seq(1, 10)` create a sequence of numbers from 1 to 10." },
        "q10": { "answer": "d", "explanation": "`rm()` and `remove()` are the same function for removing objects from the environment." }
    },
    "R Quiz - Part 2": {
        "q1": { "answer": "a", "explanation": "`matrix()` is used to create a matrix." },
        "q2": { "answer": "c", "explanation": "`nrow()` returns the number of rows of a data frame or matrix." },
        "q3": { "answer": "b", "explanation": "R uses 1-based indexing, so the first element is accessed with `v[1]`." },
        "q4": { "answer": "a", "explanation": "`!=` is the operator for 'not equal to'." },
        "q5": { "answer": "a", "explanation": "`list()` is used to create a list, which can contain elements of different types." },
        "q6": { "answer": "b", "explanation": "`mean()` calculates the arithmetic mean of a vector." },
        "q7": { "answer": "c", "explanation": "Both `data.frame()` and `as.data.frame()` can be used to create data frames." },
        "q8": { "answer": "a", "explanation": "`summary()` provides a statistical summary of a data frame." },
        "q9": { "answer": "d", "explanation": "All three methods can be used to select a column from a data frame." },
        "q10": { "answer": "a", "explanation": "`read.csv()` is the specific function for reading CSV files." }
    },
    "R Quiz - Part 3": {
        "q1": { "answer": "a", "explanation": "The syntax for a 'for' loop in R is `for (variable in sequence) { ... }`." },
        "q2": { "answer": "a", "explanation": "The syntax for an 'if' statement in R is `if (condition) { ... }`." },
        "q3": { "answer": "c", "explanation": "`plot()` is the base R plotting function, while `ggplot()` is from the popular `ggplot2` package." },
        "q4": { "answer": "a", "explanation": "Functions are defined using the `function` keyword and assigned to a variable." },
        "q5": { "answer": "b", "explanation": "`paste()` is used to concatenate strings." },
        "q6": { "answer": "a", "explanation": "`length()` returns the number of elements in a vector." },
        "q7": { "answer": "c", "explanation": "`is.na()` returns a logical vector indicating which elements are `NA`." },
        "q8": { "answer": "c", "explanation": "Both `x[!is.na(x)]` and `na.omit(x)` can be used to remove missing values." },
        "q9": { "answer": "a", "explanation": "`Sys.Date()` returns the current date." },
        "q10": { "answer": "c", "explanation": "Both `factor()` and `as.factor()` can be used to create factors." }
    },
    "R Quiz - Part 4": {
        "q1": { "answer": "a", "explanation": "`dplyr` is a core package in the `tidyverse` for data manipulation." },
        "q2": { "answer": "b", "explanation": "`filter()` is used to subset rows based on a condition." },
        "q3": { "answer": "a", "explanation": "`select()` is used to choose columns." },
        "q4": { "answer": "c", "explanation": "`mutate()` is used to create new columns." },
        "q5": { "answer": "d", "explanation": "`arrange()` is used to sort rows." },
        "q6": { "answer": "c", "explanation": "`%>%` is from the `magrittr` package (and used by `dplyr`), while `|>` is the base R pipe introduced in R 4.1.0." },
        "q7": { "answer": "b", "explanation": "`ggplot2` is a powerful and popular package for creating graphics." },
        "q8": { "answer": "a", "explanation": "The basic structure of a `ggplot` involves specifying the data, aesthetics (mapping variables to visual properties), and at least one geom (geometric object)." },
        "q9": { "answer": "c", "explanation": "`geom_point()` is used to create scatter plots." },
        "q10": { "answer": "a", "explanation": "`geom_bar()` is used to create bar charts." }
    },
    "R Quiz - Part 5": {
        "q1": { "answer": "a", "explanation": "R Markdown allows you to combine R code, text, and output into a single document that can be rendered in various formats (HTML, PDF, Word)." },
        "q2": { "answer": "d", "explanation": "A code chunk is created with ```{r}, inline code with `r`, and the question mentions both, so all of the above is the best answer." },
        "q3": { "answer": "b", "explanation": "`echo=FALSE` prevents the code from being shown in the final document, but the code is still executed." },
        "q4": { "answer": "a", "explanation": "`eval=FALSE` prevents the code from being executed, but the code is still shown in the final document." },
        "q5": { "answer": "b", "explanation": "The `devtools` package is needed to install packages from GitHub." },
        "q6": { "answer": "b", "explanation": "`setwd()` stands for 'set working directory'." },
        "q7": { "answer": "d", "explanation": "Both `ls()` and `objects()` list the objects in the current environment." },
        "q8": { "answer": "c", "explanation": "Both single and double quotes can be used to create character strings." },
        "q9": { "answer": "d", "explanation": "All three functions can be used to get information about the type of an object, with subtle differences between them." },
        "q10": { "answer": "a", "explanation": "`rm(list = ls())` removes all objects from the current environment. `ls()` lists all objects, and `rm()` removes them." }
    }
};

quizForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const firstName = prompt("Please enter your first name:");
    if (!firstName) {
        return;
    }

    const formData = new FormData(quizForm);
    let score = 0;
    const quizAnswers = answers[quizTitle];
    for (let [question, answerData] of Object.entries(quizAnswers)) {
        if (formData.get(question) === answerData.answer) {
            score++;
        }
    }

    const submissionData = {
        firstName,
        quizTitle,
        score,
        total: Object.keys(quizAnswers).length
    };

    try {
        const response = await fetch('/rquiz/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submissionData)
        });

        if (response.status === 409) {
            alert("You have already taken this quiz.");
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to save results. Status: ' + response.status);
        }

    } catch (error) {
        console.error("Error saving results:", error);
        alert("There was an error saving your results. Please try again.");
        return;
    }


    // Disable the form
    quizForm.querySelectorAll('input, button').forEach(element => {
        element.disabled = true;
    });

    let explanationHtml = `<h2>Your Results</h2><p>You scored ${score} out of ${Object.keys(quizAnswers).length}.</p>`;
    const resultsHeader = document.createElement('div');
    resultsHeader.innerHTML = explanationHtml;
    quizForm.before(resultsHeader);


    const questions = document.querySelectorAll('.question');
    questions.forEach((question, index) => {
        const questionName = `q${index + 1}`;
        const userAnswer = formData.get(questionName);
        const correctAnswer = quizAnswers[questionName].answer;
        const explanation = quizAnswers[questionName].explanation;

        const options = question.querySelectorAll('input[type="radio"]');
        options.forEach(option => {
            const optionValue = option.value;
            const textNode = option.nextSibling;

            const span = document.createElement('span');
            span.textContent = textNode.textContent;
            textNode.parentNode.replaceChild(span, textNode);

            if (optionValue === correctAnswer) {
                span.style.color = 'green';
                span.style.fontWeight = 'bold';
            }

            if (optionValue === userAnswer && userAnswer !== correctAnswer) {
                span.style.color = 'red';
                span.style.fontWeight = 'bold';
            }
        });

        const explanationElement = document.createElement('p');
        explanationElement.innerHTML = `<b>Explanation:</b> ${explanation}`;
        question.appendChild(explanationElement);
    });
});
