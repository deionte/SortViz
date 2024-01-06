import React from "react";
import { useState, useEffect } from "react";
import { getMergeSortAnimations } from "../MergeSort/mergesort";
import "../styles/SortingVisualizer.css";


const ANIMATION_SPEED_MS = 1;

const NUMBER_OF_ARRAY_BARS = 230;

const PRIMARY_COLOR = "#339af0";

const SECONDARY_COLOR = "#f03e3e";

function SortViz() {
  const [stateArray, setStateArray] = useState([]);

  const randomIntBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = () => {
    const array = [];

    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntBetween(20, 1000));
    }
    setStateArray(array);
  };

  useEffect(() => {
    resetArray();
  }, []);

  const mergeSort = () => {
    const animations = getMergeSortAnimations(stateArray);
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
  };

  return (
    <>
      <div className="logo-container">
        <img className="home-logo" src="../SortViz.png" />
      </div>

      <div className="button-container">
        <button className="array-button" onClick={() => resetArray()}>
         Create New Array
        </button>
        <button className="array-button" onClick={() => mergeSort()}>
         Sort
        </button>
      </div>

      <div className="array-container">
        {stateArray.map((value, index) => (
          <div
            className="array-bar"
            key={index}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default SortViz;
