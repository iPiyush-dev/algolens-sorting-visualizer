//Insertion Sort
function insertionSort(arr){
    let a = [...arr];
    let steps =[];
    for(let i=1;i<a.length;i++){
        let key = a[i];
        let j = i-1;
    
        while( j>=0 && a[j]>key){
            a[j+1]=a[j];
            j--;
        }
        a[j+1]=key;
        steps.push([...a]);
    }
    return steps;
}
console.log(insertionSort([7,8,9,4,3,1]))

//Selection Sort
function selectionSort(arr){
    let a = [...arr];
    let b = [];
    for (let i = 0;i<a.length;i++){
        let min = i;
        for (let j = i+1;j<a.length;j++){
            if(a[j]<a[min]){
                min = j;
            }
        }
        if(min != i){
            [a[i],a[min]]=[a[min],a[i]];
            b.push([...a])
        }
    }
    return b;
}
console.log(selectionSort([9,4,1,2,3,6]));

//Bubble Sort
function bubbleSort(arr){
    let a = [...arr];
    let b =[];
    for(let i=0;i<a.length;i++){
        for(let j =0;j<a.length-i-1;j++){
            if (a[j]>a[j+1]){
                [a[j],a[j+1]]=[a[j+1],a[j]];
                b.push([...a])
            }
        }
    }
    return b;
}
console.log(bubbleSort([6,4,7,2,1]))

//Merge Sort
function mergeSort(arr){
    if(arr.length <=1){
        return arr;
    }
    let mid =  Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0,mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left,right)
}
function merge(left,right){
    let result = [];
    let i=0;
    let j =0;
    while(i<left.length&&j<right.length){
        if(left[i]<right[j]){
            result.push(left[i]);
            i++;
        }else{
            result.push(right[j]);
            j++;
        }
    }
    return result
        .concat(left.slice(i))
        .concat(right.slice(j));
}
console.log(mergeSort([3,4,2,1,5,0]))

//Heap Sort
function heapSort(arr) {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Heapify reduced heap
        heapify(arr, i, 0);
    }

    return arr;
}

function heapify(arr, heapSize, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== root) {
        [arr[root], arr[largest]] = [arr[largest], arr[root]];
        heapify(arr, heapSize, largest);
    }
}
const arr = [12, 11, 13, 5, 6, 7];
console.log(heapSort(arr)); 

//Quick Sort
function quickSortSteps(arr) {
    let a = [...arr];
    let b = [];
    function quickSort(low, high) {
        if (low < high) {
            const pivotIndex = partition(low, high);
            b.push({
                type: "pivotPlaced",
                pivotIndex,
                array: [...a]
            });
            quickSort(low, pivotIndex - 1);
            quickSort(pivotIndex + 1, high);
        }
    }
    function partition(low, high) {
        const pivot = a[high];
        b.push({
            type: "pivot",
            pivot,
            array: [...a]
        });
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (a[j] < pivot) {
                i++;
                [a[i], a[j]] = [a[j], a[i]];
                b.push({
                    type: "swap",
                    swapped: [a[i], a[j]],
                    array: [...a]
                });
            }
        }
        [a[i + 1], a[high]] = [a[high], a[i + 1]];
        b.push({
            type: "movePivot",
            array: [...a]
        });
        return i + 1;
    }
    quickSort(0, a.length - 1);
    return b;
}
const b = quickSortsteps([10, 7, 8, 9, 1, 5]);
console.log(b);
