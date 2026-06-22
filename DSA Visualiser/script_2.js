// Target elements and make the button functioning

// Targeting Button
let visualiseSorting = document.getElementById("sorting-btn");

// Adding onclick method to the button
visualiseSorting.addEventListener("click", function () {
    let inputValues = document.getElementById("input-box").value;


    // Read Dropdown selection
    let sortMethod = document.getElementById("algo-selector").value;

    // Conversion of input elements into an array with some input validation (regex used);
    let rawArray = inputValues.split(/[,\s]+/).filter(item => item !== " ");
    let cleanArray = rawArray.map(item => {
        let cleanItem = item.replace(/[' "]+/g, '').trim();
        if (cleanItem === '' || cleanItem === "") {
            return NaN;
        }
        return Number(cleanItem);
    }).filter(item => !isNaN(item));
    // Handle Duplicacy: But not necessary in sorting algorithms..
    let finalArray = [...new Set(cleanArray)];

    // Algorithms

    let sortingSteps = document.getElementById('sorting-steps-process');
    sortingSteps.innerHTML = "";

    


    // targeting the final output response...
    let finalOutputArray = document.getElementById("final-output-msg");
    finalOutputArray.style.color = "#34C759";
    finalOutputArray.innerHTML = "[" + finalArray + "]";
});
