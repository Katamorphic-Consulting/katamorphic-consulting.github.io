const quizForm = document.getElementById('quiz-form');
const quizTitle = document.querySelector('h1').textContent;

const answers = {
    "R Quiz - Part 1": {
        "q1": { "answer": "a", "explanation": "`getwd()` stands for 'get working directory'." },
        "q2": { "answer": "b", "explanation": "`<-` is the conventional assignment operator in R. While `=` can also be used, `<-` is preferred for clarity and historical reasons." },
        "q3": { "answer": "b", "explanation": "`c()` stands for 'combine' or 'concatenate', and it's used to create vectors." },
        "q4": { "answer": "c", "explanation": "`install.packages()` is the function to install packages from CRAN." },
        "q5": { "answer": "a", "explanation": "`library()` is the standard way to load a package in R." },
        "q6": { "answer": "b", "explanation": "R performs element-wise operations on vectors of the same length." },
        "q7": { "answer": "b", "explanation": "Using `?` followed by the function name is a quick way to access help documentation in R." },
        "q8": { "answer": "c", "explanation": "`TRUE` and `FALSE` are logical values in R." },
        "q9": { "answer": "a", "explanation": "The colon operator `:` is a concise way to create a sequence of integers." },
        "q10": { "answer": "a", "explanation": "`rm()` is the standard function to remove objects from the R workspace." },
        "q11": { "answer": "b", "explanation": "RStudio is the most widely used integrated development environment for R." },
        "q12": { "answer": "c", "explanation": "`readline()` reads a line of input from the console as a character string." },
        "q13": { "answer": "c", "explanation": "By default, `paste()` separates elements with a single space." },
        "q14": { "answer": "c", "explanation": "`paste0()` is a shortcut for `paste(..., sep = '')`." },
        "q15": { "answer": "b", "explanation": "The hash symbol `#` is used for comments in R." },
        "q16": { "answer": "b", "explanation": "`as.integer()` is used for coercion to integer types." },
        "q17": { "answer": "c", "explanation": "CSV stands for Comma Separated Values, a common format for tabular data." },
        "q18": { "answer": "c", "explanation": "`read.csv()` is specifically designed to read CSV files with standard settings." },
        "q19": { "answer": "b", "explanation": "In bracket notation `[row, column]`, leaving the row blank selects all rows for that column." },
        "q20": { "answer": "c", "explanation": "The `$` operator is a convenient way to extract a named column from a data frame." },
        "q21": { "answer": "c", "explanation": "`nrow()` returns the number of rows in a data frame or matrix." },
        "q22": { "answer": "b", "explanation": "`unique()` returns a vector with duplicate elements removed." },
        "q23": { "answer": "c", "explanation": "`NA` represents missing or 'Not Available' data in R." },
        "q24": { "answer": "a", "explanation": "`NaN` stands for 'Not a Number', typically resulting from undefined math like 0/0." },
        "q25": { "answer": "c", "explanation": "`factor()` is used to handle categorical data and their levels." },
        "q26": { "answer": "c", "explanation": "`ls()` lists the names of all objects currently defined in the workspace." },
        "q27": { "answer": "b", "explanation": "`as.integer()` truncates decimal values towards zero." },
        "q28": { "answer": "c", "explanation": "The `row.names` argument in `write.csv()` defaults to TRUE; setting it to FALSE omits them." },
        "q29": { "answer": "c", "explanation": "`colnames()` returns or sets the column names of a data frame or matrix." },
        "q30": { "answer": "c", "explanation": "Debugging is the systematic process of identifying and resolving bugs in code." }
    },
    "R Quiz - Part 2": {
        "q1": { "answer": "a", "explanation": "`matrix()` is used to create a matrix." },
        "q2": { "answer": "c", "explanation": "`nrow()` returns the number of rows of a data frame or matrix." },
        "q3": { "answer": "b", "explanation": "R uses 1-based indexing, so the first element is accessed with `v[1]`." },
        "q4": { "answer": "a", "explanation": "`!=` is the operator for 'not equal to'." },
        "q5": { "answer": "a", "explanation": "`list()` is used to create a list, which can contain elements of different types." },
        "q6": { "answer": "b", "explanation": "`mean()` calculates the arithmetic mean of a vector." },
        "q7": { "answer": "a", "explanation": "`data.frame()` is the primary function for creating data frames from scratch." },
        "q8": { "answer": "a", "explanation": "`summary()` provides a statistical summary of a data frame." },
        "q9": { "answer": "b", "explanation": "The `$` operator is a common and convenient way to extract a single column by name." },
        "q10": { "answer": "a", "explanation": "`read.csv()` is the specific function for reading CSV files." },
        "q11": { "answer": "c", "explanation": "`load()` is used to bring data from an `.RData` file into the workspace." },
        "q12": { "answer": "b", "explanation": "You can subset multiple elements by passing a vector of indices to the brackets." },
        "q13": { "answer": "b", "explanation": "A negative index in R excludes that element from the result." },
        "q14": { "answer": "c", "explanation": "Comparison operators in R are vectorized and return logical values (TRUE/FALSE)." },
        "q15": { "answer": "c", "explanation": "`which()` returns the positions (indices) where a logical vector is TRUE." },
        "q16": { "answer": "c", "explanation": "The single pipe `|` represents the vectorized logical OR." },
        "q17": { "answer": "a", "explanation": "The single ampersand `&` represents the vectorized logical AND." },
        "q18": { "answer": "b", "explanation": "`any()` returns TRUE if at least one element in a logical vector is TRUE." },
        "q19": { "answer": "b", "explanation": "`all()` returns TRUE only if every element in a logical vector is TRUE." },
        "q20": { "answer": "c", "explanation": "The exclamation mark `!` is the logical NOT operator in R." },
        "q21": { "answer": "b", "explanation": "`save()` allows you to store specific objects in an `.RData` file format." },
        "q22": { "answer": "c", "explanation": "`na.rm = TRUE` tells the function to remove NA values before performing the calculation." },
        "q23": { "answer": "c", "explanation": "`subset()` is a base R function for selecting rows and columns based on conditions." },
        "q24": { "answer": "b", "explanation": "`is.na()` returns a logical vector of the same length as the input, with TRUE for NA values." },
        "q25": { "answer": "b", "explanation": "Setting `rownames(df)` to `NULL` resets them to the default sequential integers." },
        "q26": { "answer": "c", "explanation": "`\n` is the escape sequence for a newline (line feed)." },
        "q27": { "answer": "c", "explanation": "`rbind()` combines objects by rows, assuming they have compatible structures." },
        "q28": { "answer": "c", "explanation": "`ifelse()` is a vectorized function that returns values based on a logical test." },
        "q29": { "answer": "b", "explanation": "`cat()` prints raw text output to the console, while `print()` shows the object structure." },
        "q30": { "answer": "c", "explanation": "`length()` returns the number of elements in a vector." }
    },
    "R Quiz - Part 3": {
        "q1": { "answer": "a", "explanation": "The syntax for a 'for' loop in R is `for (variable in sequence) { ... }`." },
        "q2": { "answer": "a", "explanation": "The syntax for an 'if' statement in R is `if (condition) { ... }`." },
        "q3": { "answer": "a", "explanation": "`plot()` is the versatile base R function for creating a wide variety of graphs." },
        "q4": { "answer": "a", "explanation": "Functions are defined using the `function` keyword and assigned to a variable." },
        "q5": { "answer": "b", "explanation": "`paste()` is used to concatenate strings." },
        "q6": { "answer": "a", "explanation": "`length()` returns the number of elements in a vector." },
        "q7": { "answer": "c", "explanation": "`is.na()` returns a logical vector indicating which elements are `NA`." },
        "q8": { "answer": "b", "explanation": "`na.omit()` is a convenient function that removes `NA` values from an object." },
        "q9": { "answer": "a", "explanation": "`Sys.Date()` returns the current date." },
        "q10": { "answer": "a", "explanation": "`factor()` is used to create factors, which represent categorical data in R." },
        "q11": { "answer": "c", "explanation": "The code within a function is enclosed in curly braces `{ }`." },
        "q12": { "answer": "b", "explanation": "In R, a function returns the value of the last line evaluated if no `return()` is used." },
        "q13": { "answer": "c", "explanation": "Defaults are set in the function definition using the `=` assignment operator." },
        "q14": { "answer": "b", "explanation": "Variables defined within a function belong to that function's local environment." },
        "q15": { "answer": "c", "explanation": "`suppressWarnings()` runs code while hiding any warnings it might generate." },
        "q16": { "answer": "a", "explanation": "The `repeat` loop has no exit condition; it must be stopped with a `break` statement." },
        "q17": { "answer": "c", "explanation": "`break` is used to terminate the execution of a loop immediately." },
        "q18": { "answer": "b", "explanation": "`next` skips the current iteration and starts the next one in the loop." },
        "q19": { "answer": "b", "explanation": "`c()` with no arguments creates an empty vector." },
        "q20": { "answer": "c", "explanation": "The `apply` family of functions are powerful tools for iteration without explicit loops." },
        "q21": { "answer": "b", "explanation": "In `apply()`, `MARGIN = 1` indicates that the function should be applied across rows." },
        "q22": { "answer": "b", "explanation": "In `apply()`, `MARGIN = 2` indicates that the function should be applied across columns." },
        "q23": { "answer": "b", "explanation": "`paste0()` concatenates without any separator, so 'R' and 'Studio' become 'RStudio'." },
        "q24": { "answer": "c", "explanation": "`for` loops are ideal for iterating over a known set of elements or a fixed range." },
        "q25": { "answer": "c", "explanation": "`rownames()` is the standard function to get or set the row names of a data frame." },
        "q26": { "answer": "a", "explanation": "The colon operator `:` generates a sequence of integers from start to end inclusive." },
        "q27": { "answer": "c", "explanation": "Default values for logical parameters are set like any other: `param = TRUE`." },
        "q28": { "answer": "c", "explanation": "The Global Environment is the top-level workspace where users typically work." },
        "q29": { "answer": "c", "explanation": "A `while` loop checks its condition at the beginning of each iteration." },
        "q30": { "answer": "b", "explanation": "`apply()` is often more concise and expressive than writing out a full `for` loop." }
    },
    "R Quiz - Part 4": {
        "q1": { "answer": "a", "explanation": "`dplyr` is a core package in the `tidyverse` for data manipulation." },
        "q2": { "answer": "b", "explanation": "`filter()` is used to subset rows based on a condition." },
        "q3": { "answer": "a", "explanation": "`select()` is used to choose columns." },
        "q4": { "answer": "c", "explanation": "`mutate()` is used to create new columns." },
        "q5": { "answer": "d", "explanation": "`arrange()` is used to sort rows." },
        "q6": { "answer": "b", "explanation": "The `|>` operator is the native pipe introduced in R version 4.1.0." },
        "q7": { "answer": "b", "explanation": "`ggplot2` is a powerful and popular package for creating graphics." },
        "q8": { "answer": "a", "explanation": "The basic structure of a `ggplot` involves specifying the data, aesthetics (mapping variables to visual properties), and at least one geom (geometric object)." },
        "q9": { "answer": "c", "explanation": "`geom_point()` is used to create scatter plots." },
        "q10": { "answer": "a", "explanation": "`geom_bar()` is used to create bar charts." },
        "q11": { "answer": "c", "explanation": "In the tidyverse, `!` (or `-`) inside `select()` is used to exclude columns." },
        "q12": { "answer": "b", "explanation": "`ends_with()` is a tidyselect helper that selects columns based on their suffix." },
        "q13": { "answer": "c", "explanation": "`arrange(desc(column))` sorts the data in descending order for that column." },
        "q14": { "answer": "b", "explanation": "`distinct()` keeps only unique rows from a data frame." },
        "q15": { "answer": "c", "explanation": "`group_by()` creates a grouped tibble where operations are performed by group." },
        "q16": { "answer": "c", "explanation": "`summarize()` reduces groups into single rows of summary statistics." },
        "q17": { "answer": "b", "explanation": "A core Tidy Data principle is that each observation must have its own row." },
        "q18": { "answer": "a", "explanation": "`pivot_longer()` collapses multiple columns into key-value pairs." },
        "q19": { "answer": "c", "explanation": "`pivot_wider()` spreads key-value pairs into multiple columns." },
        "q20": { "answer": "c", "explanation": "`str_trim()` removes whitespace from the start and end of a string." },
        "q21": { "answer": "c", "explanation": "`str_to_title()` capitalizes the first letter of every word." },
        "q22": { "answer": "c", "explanation": "`str_detect()` returns TRUE if the pattern is found in the string, FALSE otherwise." },
        "q23": { "answer": "c", "explanation": "Geometries (geoms) determine the visual mark used to represent the data." },
        "q24": { "answer": "c", "explanation": "ggplot2 uses the `+` operator to combine layers and components." },
        "q25": { "answer": "c", "explanation": "`labs()` is the preferred way to modify labels like x, y, and title." },
        "q26": { "answer": "c", "explanation": "The Viridis scales are designed to be perceptually uniform and colorblind friendly." },
        "q27": { "answer": "c", "explanation": "`ggsave()` is the standard function for exporting ggplot2 plots." },
        "q28": { "answer": "c", "explanation": "`geom_hline()` adds a horizontal line based on a y-intercept value." },
        "q29": { "answer": "b", "explanation": "Jittering adds a small amount of random noise to prevent points from overlapping exactly." },
        "q30": { "answer": "c", "explanation": "`ungroup()` removes any grouping metadata from a data frame." }
    },
    "R Quiz - Part 5": {
        "q1": { "answer": "a", "explanation": "R Markdown allows you to combine R code, text, and output into a single document that can be rendered in various formats (HTML, PDF, Word)." },
        "q2": { "answer": "a", "explanation": "Code chunks in R Markdown are delimited by three backticks and `{r}`." },
        "q3": { "answer": "b", "explanation": "`echo=FALSE` prevents the code from being shown in the final document, but the code is still executed." },
        "q4": { "answer": "a", "explanation": "`eval=FALSE` prevents the code from being executed, but the code is still shown in the final document." },
        "q5": { "answer": "b", "explanation": "The `devtools` package is needed to install packages from GitHub." },
        "q6": { "answer": "b", "explanation": "`setwd()` stands for 'set working directory'." },
        "q7": { "answer": "a", "explanation": "`ls()` is the standard function to list the names of objects in the current R environment." },
        "q8": { "answer": "a", "explanation": "Character strings can be created using double quotes." },
        "q9": { "answer": "a", "explanation": "`class()` returns the class of an object, which is used for R's object-oriented systems." },
        "q10": { "answer": "a", "explanation": "`rm(list = ls())` removes all objects from the current environment. `ls()` lists all objects, and `rm()` removes them." },
        "q11": { "answer": "c", "explanation": "`message()` is used for purely informational text output." },
        "q12": { "answer": "b", "explanation": "`warning()` alerts the user to potential issues without stopping execution." },
        "q13": { "answer": "c", "explanation": "`stop()` throws an error and halts the execution of the current function." },
        "q14": { "answer": "c", "explanation": "`testthat` is the most popular framework for unit testing in R." },
        "q15": { "answer": "c", "explanation": "`expect_equal()` checks if two objects are equal, allowing for small numerical differences." },
        "q16": { "answer": "b", "explanation": "Floating-point numbers cannot always be represented exactly in binary memory." },
        "q17": { "answer": "b", "explanation": "In TDD, you write a failing test first, then write code to make it pass." },
        "q18": { "answer": "a", "explanation": "`describe()` and `it()` are used for behavior-driven development testing." },
        "q19": { "answer": "c", "explanation": "The `DESCRIPTION` file is the primary metadata file for every R package." },
        "q20": { "answer": "b", "explanation": "The `NAMESPACE` file controls which functions are exported to the user." },
        "q21": { "answer": "c", "explanation": "By convention, all R source code for a package is stored in the `R/` directory." },
        "q22": { "answer": "c", "explanation": "The `man/` directory contains documentation in the R Documentation (.Rd) format." },
        "q23": { "answer": "c", "explanation": "Functions listed with `export()` in NAMESPACE are visible when the package is loaded." },
        "q24": { "answer": "c", "explanation": "`load_all()` simulates installing and loading the package for development." },
        "q25": { "answer": "c", "explanation": "`test()` is a devtools wrapper that runs all tests defined in `tests/testthat`." },
        "q26": { "answer": "c", "explanation": "`.Rd` files use a LaTeX-like markup to create package documentation." },
        "q27": { "answer": "c", "explanation": "The `\arguments{}` tag is used to describe the inputs to a function in `.Rd` files." },
        "q28": { "answer": "c", "explanation": "`build()` creates a package bundle file ready for distribution." },
        "q29": { "answer": "c", "explanation": "`install.packages()` can take a path to a local `.tar.gz` file as an argument." },
        "q30": { "answer": "b", "explanation": "`expect_match()` uses regular expressions to check if a string contains a pattern." }
    },
    "CS50x Quiz - Part 1": {
        "q1": { "answer": "b", "explanation": "A bit is the most basic unit of information." },
        "q2": { "answer": "b", "explanation": "A byte consists of 8 bits." },
        "q3": { "answer": "b", "explanation": "ASCII maps characters to numbers (0-127)." },
        "q4": { "answer": "b", "explanation": "Unicode provides a standard for all characters and emojis." },
        "q5": { "answer": "c", "explanation": "RGB stands for Red, Green, Blue." },
        "q6": { "answer": "c", "explanation": "Binary search has O(log n) complexity." },
        "q7": { "answer": "b", "explanation": "Pseudocode is human-readable logic." },
        "q8": { "answer": "b", "explanation": "The center of the Scratch stage is (0,0)." },
        "q9": { "answer": "b", "explanation": "The `answer` block stores the input from `ask`." },
        "q10": { "answer": "b", "explanation": "A compiler translates source code to machine code." },
        "q11": { "answer": "b", "explanation": "`make` is the build tool used in CS50." },
        "q12": { "answer": "b", "explanation": "`\\n` is the newline character." },
        "q13": { "answer": "b", "explanation": "`stdio.h` stands for standard input/output." },
        "q14": { "answer": "c", "explanation": "`%s` is the format code for strings." },
        "q15": { "answer": "b", "explanation": "`ls` lists files in a directory." },
        "q16": { "answer": "b", "explanation": "`==` is the equality operator." },
        "q17": { "answer": "b", "explanation": "`||` is the logical OR operator." },
        "q18": { "answer": "b", "explanation": "`counter++` increments the value." },
        "q19": { "answer": "a", "explanation": "A `for` loop contains initialization, condition, and increment." },
        "q20": { "answer": "b", "explanation": "Rubber duck debugging is explaining code out loud." },
        "q21": { "answer": "c", "explanation": "`debug50` is the debugger in CS50." },
        "q22": { "answer": "b", "explanation": "Preprocessing handles `#include` directives." },
        "q23": { "answer": "c", "explanation": "An `int` is typically 4 bytes in C." },
        "q24": { "answer": "b", "explanation": "Arrays store elements in contiguous memory." },
        "q25": { "answer": "b", "explanation": "C arrays use 0-based indexing." },
        "q26": { "answer": "b", "explanation": "`\\0` is the NUL terminator for strings." },
        "q27": { "answer": "c", "explanation": "`string.h` provides string functions like `strlen`." },
        "q28": { "answer": "c", "explanation": "`argv[0]` is the program name." },
        "q29": { "answer": "c", "explanation": "0 indicates success, non-zero indicates failure." },
        "q30": { "answer": "b", "explanation": "Out-of-bounds access can cause a segmentation fault." }
    },
    "CS50x Quiz - Part 2": {
        "q1": { "answer": "c", "explanation": "Linear search takes O(n) time in the worst case." },
        "q2": { "answer": "b", "explanation": "Binary search requires a sorted sequence." },
        "q3": { "answer": "c", "explanation": "Big O describes the upper bound of running time." },
        "q4": { "answer": "b", "explanation": "Big Omega denotes the lower bound." },
        "q5": { "answer": "d", "explanation": "Selection sort is O(n^2) due to nested loops." },
        "q6": { "answer": "c", "explanation": "Bubble sort is O(n^2) in the worst case." },
        "q7": { "answer": "c", "explanation": "Merge sort is highly efficient at O(n log n)." },
        "q8": { "answer": "b", "explanation": "The base case terminates the recursion." },
        "q9": { "answer": "b", "explanation": "The recursive case moves toward the base case." },
        "q10": { "answer": "a", "explanation": "Structs allow custom data types." },
        "q11": { "answer": "b", "explanation": "A pointer stores a memory address." },
        "q12": { "answer": "b", "explanation": "`&` is the address-of operator." },
        "q13": { "answer": "a", "explanation": "`*` dereferences a pointer." },
        "q14": { "answer": "c", "explanation": "`malloc` allocates heap memory." },
        "q15": { "answer": "b", "explanation": "`free` returns memory to the system." },
        "q16": { "answer": "b", "explanation": "`NULL` represents an invalid or empty pointer." },
        "q17": { "answer": "c", "explanation": "`s + 1` skips one character in memory." },
        "q18": { "answer": "d", "explanation": "`strcmp` returns 0 for equal strings." },
        "q19": { "answer": "b", "explanation": "`valgrind` is used for debugging memory." },
        "q20": { "answer": "b", "explanation": "Garbage values are leftover data in uninitialized memory." },
        "q21": { "answer": "b", "explanation": "Pointers allow modifying the actual variable." },
        "q22": { "answer": "c", "explanation": "Infinite recursion exhausts the stack." },
        "q23": { "answer": "c", "explanation": "Queues are FIFO." },
        "q24": { "answer": "a", "explanation": "Stacks are LIFO." },
        "q25": { "answer": "d", "explanation": "Nodes contain data and a pointer to the next node." },
        "q26": { "answer": "c", "explanation": "Linked lists require linear search O(n)." },
        "q27": { "answer": "b", "explanation": "BST search is O(log n) when balanced." },
        "q28": { "answer": "c", "explanation": "Collisions occur when two keys hash to the same index." },
        "q29": { "answer": "a", "explanation": "Tries offer O(1) search time." },
        "q30": { "answer": "c", "explanation": "Tries use a lot of memory for nodes." }
    },
    "CS50x Quiz - Part 3": {
        "q1": { "answer": "c", "explanation": "Python is interpreted line by line." },
        "q2": { "answer": "b", "explanation": "Python uses dynamic typing." },
        "q3": { "answer": "a", "explanation": "f-strings use the `f` prefix." },
        "q4": { "answer": "b", "explanation": "CRUD stands for Create, Read, Update, Delete." },
        "q5": { "answer": "d", "explanation": "`SELECT` is used for queries." },
        "q6": { "answer": "b", "explanation": "`WHERE` filters the rows." },
        "q7": { "answer": "c", "explanation": "`INSERT INTO` adds new records." },
        "q8": { "answer": "d", "explanation": "`JOIN` combines tables." },
        "q9": { "answer": "b", "explanation": "Foreign keys link tables together." },
        "q10": { "answer": "c", "explanation": "Indexes often use B-Trees for speed." },
        "q11": { "answer": "d", "explanation": "`?` is used for parameterized queries." },
        "q12": { "answer": "b", "explanation": "TCP/IP is the foundational internet suite." },
        "q13": { "answer": "c", "explanation": "Port 443 is the standard for HTTPS." },
        "q14": { "answer": "c", "explanation": "404 means the resource was not found." },
        "q15": { "answer": "b", "explanation": "It tells the browser to expect HTML5." },
        "q16": { "answer": "a", "explanation": "`<ul>` stands for unordered list." },
        "q17": { "answer": "c", "explanation": "`href` stands for Hypertext REFerence." },
        "q18": { "answer": "d", "explanation": "CSS handles styles." },
        "q19": { "answer": "b", "explanation": "Dots select classes." },
        "q20": { "answer": "c", "explanation": "Bootstrap is a CSS framework." },
        "q21": { "answer": "c", "explanation": "JavaScript runs client-side in the browser." },
        "q22": { "answer": "b", "explanation": "`addEventListener` is the modern standard." },
        "q23": { "answer": "b", "explanation": "Flask is a web framework for Python." },
        "q24": { "answer": "c", "explanation": "`@app.route` defines the path." },
        "q25": { "answer": "d", "explanation": "`render_template` handles Jinja templates." },
        "q26": { "answer": "b", "explanation": "POST doesn't expose data in the URL." },
        "q27": { "answer": "c", "explanation": "POST data is in `request.form`." },
        "q28": { "answer": "a", "explanation": "Cookies help maintain session state." },
        "q29": { "answer": "b", "explanation": "JSON is JavaScript Object Notation." },
        "q30": { "answer": "c", "explanation": "`jsonify()` returns a JSON response." }
    },
    "CS50 Python Quiz - Part 1": {
        "q1": { "answer": "c", "explanation": "`print` ends with a newline by default." },
        "q2": { "answer": "c", "explanation": "`input()` always returns a string." },
        "q3": { "answer": "b", "explanation": "`strip()` removes whitespace." },
        "q4": { "answer": "c", "explanation": "`title()` formats as title case." },
        "q5": { "answer": "c", "explanation": "`int()` is used for conversion." },
        "q6": { "answer": "b", "explanation": "`round()` defaults to the nearest integer." },
        "q7": { "answer": "d", "explanation": "`def` defines a function." },
        "q8": { "answer": "b", "explanation": "`main` is the standard name." },
        "q9": { "answer": "c", "explanation": "`return` sends a value back." },
        "q10": { "answer": "b", "explanation": "`and` requires both to be true." },
        "q11": { "answer": "c", "explanation": "`elif` is short for 'else if'." },
        "q12": { "answer": "b", "explanation": "`match` is for pattern matching." },
        "q13": { "answer": "c", "explanation": "`_` is the wildcard case." },
        "q14": { "answer": "c", "explanation": "`while True` loops until broken." },
        "q15": { "answer": "b", "explanation": "`range` generates numbers." },
        "q16": { "answer": "d", "explanation": "`len()` returns the length." },
        "q17": { "answer": "c", "explanation": "`append()` adds to the end." },
        "q18": { "answer": "b", "explanation": "Dictionaries use key-value pairs." },
        "q19": { "answer": "c", "explanation": "Dictionaries use square brackets for indexing." },
        "q20": { "answer": "a", "explanation": "`try/except` handles exceptions." },
        "q21": { "answer": "b", "explanation": "Invalid conversions raise `ValueError`." },
        "q22": { "answer": "c", "explanation": "The `else` block runs if no exception occurs." },
        "q23": { "answer": "c", "explanation": "`pass` does nothing." },
        "q24": { "answer": "c", "explanation": "`pip` is the package manager." },
        "q25": { "answer": "b", "explanation": "`choice()` picks a random item." },
        "q26": { "answer": "b", "explanation": "`randint` includes both endpoints." },
        "q27": { "answer": "c", "explanation": "`sys.argv` stores command-line args." },
        "q28": { "answer": "c", "explanation": "`sys.exit` terminates the program." },
        "q29": { "answer": "b", "explanation": "Slicing from index 1 to the end." },
        "q30": { "answer": "d", "explanation": "The `json` module handles JSON data." }
    },
    "CS50 Python Quiz - Part 2": {
        "q1": { "answer": "c", "explanation": "`assert` checks for true conditions." },
        "q2": { "answer": "b", "explanation": "`AssertionError` is raised." },
        "q3": { "answer": "c", "explanation": "`pytest` is a popular testing framework." },
        "q4": { "answer": "c", "explanation": "`pytest.raises` context manager checks for errors." },
        "q5": { "answer": "b", "explanation": "`__init__.py` makes a directory a package." },
        "q6": { "answer": "c", "explanation": "'a' stands for append." },
        "q7": { "answer": "b", "explanation": "`with` ensures file closure." },
        "q8": { "answer": "c", "explanation": "`rstrip()` removes characters from the right." },
        "q9": { "answer": "b", "explanation": "It yields each row as a list." },
        "q10": { "answer": "c", "explanation": "`DictReader` use the first row as keys." },
        "q11": { "answer": "c", "explanation": "`fieldnames` defines the column order." },
        "q12": { "answer": "a", "explanation": "PIL/Pillow is the standard image library." },
        "q13": { "answer": "c", "explanation": "`re.search()` looks for a match anywhere." },
        "q14": { "answer": "b", "explanation": "The dot matches almost anything." },
        "q15": { "answer": "c", "explanation": "`*` means zero or more." },
        "q16": { "answer": "b", "explanation": "`+` means one or more." },
        "q17": { "answer": "b", "explanation": "`^` is start, `$` is end." },
        "q18": { "answer": "c", "explanation": "`re.IGNORECASE` ignores case." },
        "q19": { "answer": "b", "explanation": "The walrus operator assigns within expressions." },
        "q20": { "answer": "b", "explanation": "Classes are blueprints for objects." },
        "q21": { "answer": "c", "explanation": "It's the instance initializer." },
        "q22": { "answer": "b", "explanation": "`self` refers to the instance." },
        "q23": { "answer": "c", "explanation": "`__str__` is called by `print()` and `str()`." },
        "q24": { "answer": "b", "explanation": "They implement the property pattern." },
        "q25": { "answer": "b", "explanation": "Class methods take `cls` as the first argument." },
        "q26": { "answer": "c", "explanation": "`super()` accesses the parent class." },
        "q27": { "answer": "b", "explanation": "It allows using operators with custom objects." },
        "q28": { "answer": "b", "explanation": "Sets only store unique elements." },
        "q29": { "answer": "b", "explanation": "It's a concise way to build lists." },
        "q30": { "answer": "c", "explanation": "`yield` returns values one by one." }
    },
    "CS50 AI Quiz 1": {
        "q1": { "answer": "b", "explanation": "Agents perceive their environment and act upon it." },
        "q2": { "answer": "c", "explanation": "A state is a configuration of an agent in its environment." },
        "q3": { "answer": "d", "explanation": "DFS uses a stack (Last-In First-Out) for its frontier." },
        "q4": { "answer": "a", "explanation": "BFS is guaranteed to find the optimal solution when step costs are equal." },
        "q5": { "answer": "b", "explanation": "A heuristic function estimates the cost to reach the goal from a given state." },
        "q6": { "answer": "c", "explanation": "A* search minimizes the sum of path cost g(n) and estimated cost h(n)." },
        "q7": { "answer": "a", "explanation": "An admissible heuristic never overestimates the true cost to reach the goal." },
        "q8": { "answer": "b", "explanation": "Consistency means the estimated cost does not exceed the cost of any transition." },
        "q9": { "answer": "c", "explanation": "The minimizing player aims to reach a terminal state with the lowest utility." },
        "q10": { "answer": "b", "explanation": "Alpha-Beta pruning skips branches that cannot influence the final decision." },
        "q11": { "answer": "b", "explanation": "Depth-limited Minimax uses an evaluation function to estimate state utility." },
        "q12": { "answer": "b", "explanation": "A sentence is an assertion about the world in a representation language." },
        "q13": { "answer": "c", "explanation": "The symbol '¬' represents the logical connective 'Not'." },
        "q14": { "answer": "a", "explanation": "In an implication, the 'if' part is called the antecedent." },
        "q15": { "answer": "c", "explanation": "The biconditional connective represents 'if and only if'." },
        "q16": { "answer": "c", "explanation": "Entailment (⊨) means β is true in every model where α is true." },
        "q17": { "answer": "b", "explanation": "Inference is the process of deriving new sentences from existing ones." },
        "q18": { "answer": "c", "explanation": "Model checking enumerates all possible models to check for entailment." },
        "q19": { "answer": "b", "explanation": "Modus Ponens derives the consequent from an implication and its antecedent." },
        "q20": { "answer": "c", "explanation": "De Morgan's Law states that ¬(P ∧ Q) is equivalent to ¬P ∨ ¬Q." },
        "q21": { "answer": "b", "explanation": "Resolution produces new clauses by resolving complementary literals." },
        "q22": { "answer": "c", "explanation": "CNF is a logical formula represented as a conjunction of clauses." },
        "q23": { "answer": "b", "explanation": "Universal quantification (∀) means a property holds for all elements." },
        "q24": { "answer": "b", "explanation": "The symbol '∃' represents existential quantification ('there exists')." },
        "q25": { "answer": "c", "explanation": "The sum of probabilities of all possible outcomes is always 1." },
        "q26": { "answer": "a", "explanation": "P(a | b) is the probability of a and b divided by the probability of b." },
        "q27": { "answer": "c", "explanation": "Bayes' Rule is a formula for calculating conditional probabilities." },
        "q28": { "answer": "b", "explanation": "Bayesian networks are represented as Directed Acyclic Graphs (DAGs)." },
        "q29": { "answer": "c", "explanation": "Sampling is a technique used for approximate probabilistic inference." },
        "q30": { "answer": "c", "explanation": "The hidden state is the actual state of the world that we cannot observe directly." }
    },
    "CS50 AI Quiz 2": {
        "q1": { "answer": "b", "explanation": "Local search algorithms maintain a single node and focus on the current state." },
        "q2": { "answer": "c", "explanation": "An objective function is used when the goal is to maximize a value." },
        "q3": { "answer": "c", "explanation": "Simple hill climbing can easily get stuck in local maxima or minima." },
        "q4": { "answer": "b", "explanation": "Simulated annealing uses a decreasing temperature to allow moving to worse states." },
        "q5": { "answer": "c", "explanation": "Linear programming is a method for optimizing a linear objective function." },
        "q6": { "answer": "c", "explanation": "A Constraint Satisfaction Problem consists of variables, domains, and constraints." },
        "q7": { "answer": "b", "explanation": "A binary constraint is a constraint that involves exactly two variables." },
        "q8": { "answer": "b", "explanation": "Node consistency is when all values in a domain satisfy unary constraints." },
        "q9": { "answer": "c", "explanation": "AC-3 is an algorithm used to make a CSP arc-consistent." },
        "q10": { "answer": "b", "explanation": "Backtracking search is a recursive depth-first search for CSPs." },
        "q11": { "answer": "c", "explanation": "The MRV heuristic selects the variable with the fewest remaining values in its domain." },
        "q12": { "answer": "b", "explanation": "Supervised learning involves learning from a dataset of input-output pairs." },
        "q13": { "answer": "b", "explanation": "Classification is a task where the function maps inputs to discrete outputs." },
        "q14": { "answer": "c", "explanation": "KNN classifies a point based on the most frequent label among its neighbors." },
        "q15": { "answer": "c", "explanation": "The perceptron learning rule adjusts weights based on prediction errors." },
        "q16": { "answer": "b", "explanation": "SVMs aim to find the maximum margin separator between classes." },
        "q17": { "answer": "c", "explanation": "L2 loss squares the difference, which penalizes large outliers more heavily." },
        "q18": { "answer": "b", "explanation": "Overfitting occurs when a model fits training data too well and fails to generalize." },
        "q19": { "answer": "c", "explanation": "Regularization penalizes complexity to favor simpler, more general models." },
        "q20": { "answer": "b", "explanation": "Q-learning estimates the expected utility of taking an action in a state." },
        "q21": { "answer": "c", "explanation": "Epsilon-greedy algorithms balance exploitation of best moves and exploration of new ones." },
        "q22": { "answer": "c", "explanation": "The ReLU activation function outputs 0 for any negative input value." },
        "q23": { "answer": "b", "explanation": "Backpropagation propagates errors backward to update neural network weights." },
        "q24": { "answer": "c", "explanation": "Dropout prevents overfitting by randomly removing units during training." },
        "q25": { "answer": "c", "explanation": "Image convolution applies a kernel filter to an image to distill features." },
        "q26": { "answer": "b", "explanation": "Max-pooling reduces the size of input representations while maintaining features." },
        "q27": { "answer": "c", "explanation": "RNNs use their own output as input, making them ideal for sequence data." },
        "q28": { "answer": "c", "explanation": "Semantics refers to the meaning of words or sentences in a language." },
        "q29": { "answer": "c", "explanation": "An n-gram is a contiguous sequence of n items from a sample of text." },
        "q30": { "answer": "c", "explanation": "Transformers use the attention mechanism to focus on important parts of the context." }
    }
};

const quizAnswers = answers[quizTitle];
let score = 0;
const totalQuestions = Object.keys(quizAnswers).length;

// Handle question clicks
document.querySelectorAll('.question').forEach((questionDiv, index) => {
    const questionName = `q${index + 1}`;
    const options = questionDiv.querySelectorAll('input[type="radio"]');

    options.forEach(option => {
        option.addEventListener('change', function() {
            const userAnswer = this.value;
            const correctAnswer = quizAnswers[questionName].answer;
            const explanation = quizAnswers[questionName].explanation;

            // Lock all options for this question
            options.forEach(opt => opt.disabled = true);

            // Highlight answers
            options.forEach(opt => {
                const textNode = opt.nextSibling;
                const span = document.createElement('span');
                span.textContent = textNode.textContent;
                textNode.parentNode.replaceChild(span, textNode);

                if (opt.value === correctAnswer) {
                    span.style.color = 'green';
                    span.style.fontWeight = 'bold';
                }
                if (opt.value === userAnswer && userAnswer !== correctAnswer) {
                    span.style.color = 'red';
                    span.style.fontWeight = 'bold';
                }
            });

            // Show explanation
            const explanationElement = document.createElement('p');
            explanationElement.innerHTML = `<b>Explanation:</b> ${explanation}`;
            questionDiv.appendChild(explanationElement);

            // Update score
            if (userAnswer === correctAnswer) {
                score++;
            }
        });
    });
});

quizForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const firstName = prompt("Please enter your first name to save your results:");
    if (!firstName) {
        return;
    }

    const submissionData = {
        firstName,
        quizTitle,
        score,
        total: totalQuestions
    };

    try {
        const response = await fetch('api/submit', {
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

        alert(`Final score: ${score} / ${totalQuestions}. Results saved!`);
        window.location.href = 'results.html';

    } catch (error) {
        console.error("Error saving results:", error);
        alert("There was an error saving your results. Please try again.");
    }
});
