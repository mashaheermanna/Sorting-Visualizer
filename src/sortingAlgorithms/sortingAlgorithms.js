
//
//      merge sort
//
export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0 ,array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
){
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor ((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx +1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
}



//
  // BUBBLE SORT
//

export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    let auxiliaryArray = array.slice(); //[...array] spread array as alternative
    BubbleSortHelper(auxiliaryArray , animations);
    array = auxiliaryArray;
    return animations ;
}
 
function BubbleSortHelper(
    mainArray, 
    animations
)
{   
    let size = mainArray.length ; 
    for (let i = 0; i < size -1 ; i ++){
        for (let j = 0; j< size - i - 1; j++ ){
            animations.push([j  ,j+1]);
            animations.push([j , j+1]);
            if  ( mainArray[j] > mainArray[j+1]){
                animations.push([j,mainArray[j+1]]);
                animations.push([j+1,mainArray[j]]);

                swap (mainArray , j ,j+1);
            } else {
                animations.push([-1, -1]);
                animations.push([-1, -1]);
            }
        }
    }
}
function swap(auxiliaryArray, firstIndex, secondIndex){
    let temp = auxiliaryArray[firstIndex];
    auxiliaryArray[firstIndex] = auxiliaryArray[secondIndex];
    auxiliaryArray[secondIndex] = temp ; 
}



//
  //   QUICK SORT
//




export function getQuickSortAnimations(array) {
    let animation = [];
    if (array.length <= 1) return array;
    let auxiliaryArray = array.slice();
    const size = array.length;
    const animations = QuickSortHelper(auxiliaryArray ,0, size-1, animation, array);
    return animations;
  }
  

function QuickSortHelper(array, start, end,  animation, mainArray,) {
    if (start >= end) {
        start--;
        
        if ( start !== -1 && start !== end ){
            animation.push({indices:[start, end], type: "comp"});
            animation.push({indices:[start, end], type: "comp"});
            animation.push({indices:[start, end], type: "comp"});
            animation.push({indices:[start, end], type: "comp_1"});   
            return ;
        }
      return ;
    }
    let pivot = start,
        left = start + 1,
        right = end;
  
    animation.push({indices:[pivot, pivot], type: "pivot_comp"});
    while (right >= left) {
    //   debugger;
      animation.push({indices: [left, right], type:"comp"});
      animation.push({indices: [left, right], type:"comp"});
      animation.push({indices: [left, right], type:"comp"});
      animation.push({indices: [left, right], type:"comp_1"});

      if (array[right] < array[pivot] && array[left] > array[pivot]) {
        
        animation.push({indices: [left, right], type:"comp"});
        animation.push({indices: [left, right], type:"comp"});
        animation.push({indices: [left, right], type:"comp"});
        animation.push({indices: [left, array[right]], type:"swap"});
        animation.push({indices: [right, array[left]], type:"swap"});
        let temp = array[right];
        array[right] = array[left];
        array[left] = temp;  
        animation.push({indices: [left, right], type:"comp_1"});
      }

      animation.push({indices: [left, right], type:"comp"});
      animation.push({indices: [left, right], type:"comp"});
      animation.push({indices: [left, right], type:"comp"});
      animation.push({indices: [left, right], type:"comp_1"});
      if (array[right] >= array[pivot]) {
        right--;
        animation.push({indices: [left, right], type:"comp"});
        animation.push({indices: [left, right], type:"comp"});
        animation.push({indices: [left, right], type:"comp"});
        animation.push({indices: [left, right], type:"comp_1"});
       
      }
      
      animation.push({indices: [left,right], type:"comp"});
      animation.push({indices: [left,right], type:"comp"});
      animation.push({indices: [left,right], type:"comp"});
      animation.push({indices: [left,right], type:"comp_1"});
      if (array[left] <= array[pivot]) {
        console.log('going to showanimations for comp 2');
        left++; 
        if(left <= end){
          animation.push({indices: [left, right], type:"comp"}); 
          animation.push({indices: [left, right], type:"comp"}); 
          animation.push({indices: [left, right], type:"comp"}); 
          animation.push({indices: [left, right], type:"comp_1"});  
        }  

      }
      
    }
    animation.push({indices: [pivot, right ], type:"comp"});
    animation.push({indices: [pivot, right ], type:"comp"});
    animation.push({indices: [pivot, right ], type:"comp"});
    animation.push({indices: [pivot, right ], type:"comp_1"});
    if (pivot !== right) {
        
      animation.push({indices: [pivot, array[right]], type:"swap"});
      animation.push({indices: [right , array[pivot]], type:"swap"});
      animation.push({indices:[pivot, pivot], type: "pivot_comp_1"});

      let temp = array[right];
      array[right] = array[pivot];
      array[pivot] = temp;
      
      animation.push({indices:[right, right], type: "pivot_comp"});
      animation.push({indices:[right, right], type: "pivot_comp"});
      animation.push({indices:[right, right], type: "pivot_comp"});
      animation.push({indices:[right, right], type: "pivot_comp_1"});
    }
    QuickSortHelper(array, start, right - 1, animation, mainArray);
    QuickSortHelper(array, right + 1, end, animation, mainArray);
    return animation;
}



// 
    // Heap Sort
// 


export function getHeapSortAnimations(array) {
  const animation = [];
  if (array.length <= 1) return array;
  let auxiliaryArray = array.slice(); //[...array] spread array as alternative
  const animations = HeapSortHelper(auxiliaryArray , animation);
  console.log("array aftersrting in hea sort", auxiliaryArray);
  console.log('animationsin heapsort', animations);
  console.log("anmation.indices of 0",animations[0].indices);
  // array = auxiliaryArray;
  return animations ;
}


function HeapSortHelper( arr ,  animation)
{
  var N = arr.length;

  // Build heap (rearrange array)
  for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
  { //math.floor return nearest interger value
     heapify(arr, N, i, animation);
  }

  // One by one extract an element from heap
  for (var i = N - 1; i > 0; i--) {
    // Move current root to end
    animation.push({indices:[0, i], type: "comp", k :8});
    animation.push({indices:[0, i], type: "comp", k :8});
    animation.push({indices:[0, i], type: "comp", k :8});
    animation.push({indices: [0, arr[i]], type:"swap"});
    animation.push({indices: [i, arr[0]], type:"swap"});

    animation.push({indices:[0, i], type: "comp_1"});
    var temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    // call max heapify on the reduced heap
    heapify(arr, i, 0, animation);
  }
  return animation;
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, N, i, animation)
{
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  animation.push({indices: [largest, largest], type:"comp", k :1});
  animation.push({indices: [largest, largest], type:"comp", k :1});
  animation.push({indices: [largest, largest], type:"comp", k :1});

  if (r<i){
  animation.push({indices: [l, r ], type:"comp", k :2});
  animation.push({indices: [l, r ], type:"comp", k :2});
  animation.push({indices: [l, r ], type:"comp_1"});
}
  animation.push({indices: [largest, largest], type:"comp_1"});

  if (l<N){
  animation.push({indices: [l, largest ], type:"comp", k :3});
  animation.push({indices: [l, largest ], type:"comp", k :3});
  animation.push({indices: [l, largest ], type:"comp", k :3});
  animation.push({indices: [l, largest ], type:"comp_1"});}
  // If left child is larger than root
  if (l < N && arr[l] > arr[largest])
    {largest = l;
    animation.push({indices: [largest, largest], type:"comp", k :4});
    animation.push({indices: [largest, largest], type:"comp", k :4});
    animation.push({indices: [largest, largest], type:"comp", k :4});
    animation.push({indices: [largest, largest], type:"comp_1"});}

    if (r<N){
  animation.push({indices: [r, largest ], type:"comp", k :5});
  animation.push({indices: [r, largest ], type:"comp", k :5});
  animation.push({indices: [r, largest ], type:"comp", k :5});
  animation.push({indices: [r, largest ], type:"comp_1"});}
  // If right child is larger than largest so far
  if (r < N && arr[r] > arr[largest]) {
    largest = r;
    animation.push({indices: [largest, largest], type:"comp", k :6});
    animation.push({indices: [largest, largest], type:"comp", k :6});
    animation.push({indices: [largest, largest], type:"comp", k :6});
    animation.push({indices: [largest, largest], type:"comp_1"});}


  
  animation.push({indices: [largest, i], type:"comp", k :7});
  animation.push({indices: [largest, i], type:"comp", k :7});
  animation.push({indices: [largest, i], type:"comp", k :7});
  animation.push({indices: [largest, i], type:"comp_1"});
  // If largest is not root
  if (largest != i) {
    
    animation.push({indices:[largest, i], type: "comp", k :8});
    animation.push({indices:[largest, i], type: "comp", k :8});
    animation.push({indices:[largest, i], type: "comp", k :8});
    animation.push({indices: [i, arr[largest]], type:"swap"});
    animation.push({indices: [largest, arr[i]], type:"swap"});

    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    
    animation.push({indices:[largest, i], type: "comp_1"});
    // Recursively heapify the affected sub-tree
    heapify(arr, N, largest, animation);
  
  }
  return animation;
}
