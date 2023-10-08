import React, { useState } from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import { getQuickSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import { getHeapSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";

const ANIMATION_SPEED_MS = 5;

const PRIMARY_COLOR = "turquoise";

const SECONDARY_COLOR = "red";

const TERTIARY_COLOR = "yellow";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < document.getElementById("slider").value; i++) {
      array.push(randomIntFromInterval(5, 650));
    }
    this.setState({ array });
    console.log("this are the inital value", array);
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  BubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 4 === 0 || i % 4 === 1;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIdx, newHeight] = animations[i];
        if (barIdx === -1) {
          continue;
        }
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  QuickSort() {
    const animations = getQuickSortAnimations(this.state.array);

    const arrayBars = document.getElementsByClassName("array-bar");
    // debugger;
    for (let i = 0; i < animations.length; i++) {
      const type = animations[i].type;
      // basically comp, pivot_comp are used to color the bars
      // and comp_1, pivot_1 are used to change them back to their oringnal or required color

      if (type == "comp" || type == "comp_1") {
        const [barOneIdx, barTwoIdx] = animations[i].indices;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = type == "comp" ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (type == "pivot_comp" || type == "pivot_comp_1") {
        const [barOneIdx, barTwoIdx] = animations[i].indices;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = type == "pivot_comp" ? TERTIARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i].indices;
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  heapsort() {
    const animations = getHeapSortAnimations(this.state.array);
    console.log("animations in the heap main ", animations);
    const arrayBars = document.getElementsByClassName("array-bar");
    // debugger;
    for (let i = 0; i < animations.length; i++) {
      const type = animations[i].type;

      console.log("animation is for", animations[i]);
      // basically comp, pivot_comp are used to color the bars
      // and comp_1, pivot_1 are used to change them back to their oringnal or required color

      if (type == "comp" || type == "comp_1") {
        const [barOneIdx, barTwoIdx] = animations[i].indices;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = type == "comp" ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i].indices;
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  // Refernce to update
  // const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "white";
  // const cursor = isRunning ? "auto" : "pointer";

  render() {
    const { array } = this.state;

    return (
      <div>
        <>
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                }}
              ></div>
            ))}
          </div>
        </>
        <>
          <div className="button-placement">
            <a href="#" onClick={() => this.resetArray()}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Generate New Array
            </a>

            <a>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <input
                id="slider"
                type="range"
                defaultValue="60"
                min="5"
                max="120"
                step="5"
                onChange={() => this.resetArray()}
              />
              <span></span>
              &nbsp;&nbsp;range
            </a>

            <a href="#" onClick={() => this.mergeSort()}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              mergeSort
            </a>

            <a href="#" onClick={() => this.QuickSort()}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              QuickSort
            </a>

            {/* to add heapSort */}
            <a href="#" onClick={() => this.heapsort()}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              heapSort
            </a>

            <a href="#" onClick={() => this.BubbleSort()}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              BubbleSort
            </a>

            {/*   // button for test Sorting Algorithm
      <a href="#"   
       onClick={() => this.testSortingAlgorithms()}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Test Sorting Algorithms (BROKEN)
      </a> */}
          </div>
        </>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
  // Math.random gives us  a number from 0 - 0.999999 when multiplied by our formula will give us our desired answer
}

// to check if my algorithm worked

// function arraysAreEqual(arrayOne, arrayTwo) {
//   if (arrayOne.length !== arrayTwo.length) return false;
//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i]) {
//       return false;
//     }
//   }
//   return true;
// }
