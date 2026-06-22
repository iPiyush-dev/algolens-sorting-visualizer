// script.js — AlgoLens | Sorting Visualiser

// SECTION A — DOM ELEMENTS

const inputBox     = document.getElementById("input-box");
const algoSelector = document.getElementById("algo-selector");
const visualiseBtn = document.getElementById("sorting-btn");
const stepsDisplay = document.getElementById("sorting-steps-process");
const finalOutput  = document.getElementById("final-output-msg");

// SECTION B — ALGORITHM CONFIG

const ALGO_CONFIG = {

    "bubble-sort": {
        fn:   bubbleSort,      
        type: "steps-array"   
    },

    "selection-sort": {
        fn:   selectionSort,
        type: "steps-array"
    },

    "insertion-sort": {
        fn:   insertionSort,
        type: "steps-array"
    },

    "merge-sort": {
        fn:   mergeSort,
        type: "sorted-only"   
    },

    "heap-sort": {
        fn:   heapSort,
        type: "sorted-only"
    },

    "quick-sort": {
        fn: function(arr){
            let stepsRaw = quickSortSteps([...arr]);
            let steps = stepsRaw.map(function(obj){
                return "[" + obj.array.join(",") + "]";})
            let sorted = stepaRaw[stepsRaw.length-1].array;
            return {steps: steps, sorted: sorted};
        },  
        type: "pre-processed"
    }
};

// SECTION C — INPUT PROCESSING

function parseInput(rawInput) {
    return rawInput
        .split(/[,\s]+/)
        .map(function(item) { return item.trim(); })
        .filter(function(item) { return item !== ""; })
        .map(function(item) { return Number(item); })
        .filter(function(item) { return !isNaN(item); });
}

// SECTION D — INPUT VALIDATION

function validateInput(numbersArray, rawInput) {

    if (rawInput.trim() === "") {
        return "Please enter some numbers first.";
    }

    if (numbersArray.length === 0) {
        return "No valid numbers found. Try entering: 5, 3, 8, 1, 4";
    }

    if (numbersArray.length === 1) {
        return "Enter at least 2 numbers to visualise sorting.";
    }

    if (numbersArray.length > 20) {
        return "Maximum 20 numbers allowed for clear visualisation.";
    }

    return null;
}

// SECTION E — RESULT PROCESSOR

function processResult(rawResult, configType, originalArray) {

    if (configType === "steps-array") {

        if (!rawResult || rawResult.length === 0) {
            return {
                steps:  ["Array might already be sorted — no swaps needed!"],
                sorted: [...originalArray].sort(function(a, b) { return a - b; })
            };
        }

        let steps = rawResult.map(function(snapshot, index) {
            return "[ " + snapshot.join(", ") + " ]";
        });

        let sorted = rawResult[rawResult.length - 1];

        return { steps: steps, sorted: sorted };
    }

    if (configType === "sorted-only") {
        return {
            steps:  ["This algorithm does not expose step-by-step data yet. Showing final result only."],
            sorted: rawResult
        };
    }

    return null;
}


// SECTION F — ALGORITHM RUNNER

// Check configure - call the function and process the result

function runAlgorithm(algorithmName, numbersArray) {

    let config = ALGO_CONFIG[algorithmName];

    if (!config) {
        return null;
    }

    if (typeof config.fn !== "function") {
        return {
            steps:  ["Function not found: Make sure algorithm.js is linked in index.html before script.js"],
            sorted: [...numbersArray].sort(function(a, b) { return a - b; })
        };
    }

    // Call the function to send the copy
    let rawResult = config.fn([...numbersArray]);

    // Convert raw result into standard format
    return processResult(rawResult, config.type, numbersArray);
}


// SECTION G — DISPLAY FUNCTIONS

// Show steps to screen

function displaySteps(stepsArray) {

    if (!stepsArray || stepsArray.length === 0) {
        stepsDisplay.innerHTML = "No steps to display.";
        return;
    }

    let html = stepsArray.map(function(step, index) {
        return "<p class='step-item'>"
             + "<span class='step-number'>Step " + (index + 1) + "</span> "
             + step
             + "</p>";
    }).join("");

    stepsDisplay.innerHTML = html;
}

// Show final sorted array
function displayFinalOutput(sortedArray) {
    finalOutput.innerHTML = "[ " + sortedArray.join(", ") + " ]";
}

// Show error messages
function displayError(message) {
    stepsDisplay.innerHTML = "<span class='error-msg'>⚠ " + message + "</span>";
    finalOutput.innerHTML  = "—";
}

function setLoadingState(isLoading) {
    visualiseBtn.disabled    = isLoading;
    visualiseBtn.textContent = isLoading ? "Visualising..." : "Visualise Sorting";
}

function handleVisualise() {

    // 1. Raw values 
    let rawInput      = inputBox.value;
    let algorithmName = algoSelector.value;

    // 2. Convert input into a number
    let numbersArray  = parseInput(rawInput);

    // 3. Validate
    let error = validateInput(numbersArray, rawInput);
    if (error !== null) {
        displayError(error);
        return;
    }

    // 4. Disable the button and start processing
    setLoadingState(true);

    // 5. Run Algorithm
    let result = runAlgorithm(algorithmName, numbersArray);

    // 6. Button enable again
    setLoadingState(false);

    // 7. Kuch return nahi aaya?
    if (!result) {
        displayError("Something went wrong. Please try again.");
        return;
    }

    // 8. Display 
    displaySteps(result.steps);
    displayFinalOutput(result.sorted);
}



// Button click
visualiseBtn.addEventListener("click", handleVisualise);

// Enter key — input box mein Enter dabao, button ki zarurat nahi
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleVisualise();
    }
});
