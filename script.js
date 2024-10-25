let card = document.querySelector(".card-container");

let iconContainer = document.querySelector(".icon-container");

let icons = document.querySelectorAll(".icon");

let darkIcon = document.querySelector(".dark-icon");

let lightIcon = document.querySelector(".light-icon");

let input = document.querySelector("#calculations-input");

let lowerScreen = document.querySelector(".lower-screen");

let resultContainer = document.querySelector(".result-container");

let btns = document.querySelectorAll(".btn");

let equalBtn = document.querySelector(".equal-btn");

let dotBtn = document.querySelector(".dot-btn");

let str = "";
let evaluatedStr = "";
let operators = ["+", "-", "*", "/", "%"];
let duplicateStr = "";
let dotCount = 0;

icons.forEach(function (value) {
  value.addEventListener("click", function () {
    if (value.classList.contains("dark-icon")) {
      darkIcon.style.opacity = 1;
      lightIcon.style.opacity = 0.36;
      card.style.backgroundColor = "#1f2127";
      card.style.color = "#fff";
      iconContainer.style.backgroundColor = "#252830";
      iconContainer.style.boxShadow = "0px 0px 1px 0 #464242";
      input.style.color = "#fff";
      lowerScreen.style.backgroundColor = "#252830";

      btns.forEach(function (value) {
        value.style.backgroundColor = "#2a2d35";
        value.style.color = "#fff";
        value.style.borderColor = "#2c2f37";
        value.style.borderRightColor = "#3c3e44";
        value.style.boxShadow = "0 0 0";
        if (value.classList.contains("blue-btns")) {
          value.style.color = "#93c9f8";
        } else if (value.classList.contains("red-btns")) {
          value.style.color = "#E57373";
        } else if (value.classList.contains("equal-btn")) {
          value.style.backgroundColor = "#E57373";
        }
      });
    } else {
      lightIcon.style.opacity = 1;
      darkIcon.style.opacity = 0.36;
      card.style.backgroundColor = "#eeeeee";
      card.style.color = "#000";
      iconContainer.style.backgroundColor = "#fdfdfd";
      iconContainer.style.boxShadow = "0px 3px 5px #c2c0c0";
      input.style.color = "#000";
      lowerScreen.style.backgroundColor = "#ffffff";
      btns.forEach(function (value) {
        value.style.backgroundColor = "#ffffff";
        value.style.color = "#000";
        value.style.borderColor = "#f3f3f3";
        value.style.boxShadow = "0 3px 8px 2px #e2dede";
        if (value.classList.contains("blue-btns")) {
          value.style.color = "#42a5f5";
        } else if (value.classList.contains("red-btns")) {
          value.style.color = "#EF5350";
        } else if (value.classList.contains("equal-btn")) {
          value.style.backgroundColor = "#EF5350";
          value.style.color = "#fff";
        }
      });
    }
  });
});

btns.forEach((btn) => {
  btn.addEventListener("mousedown", () => {
    btn.classList.add("animate__pulse");
  });
});

btns.forEach((btn) => {
  btn.addEventListener("mouseup", () => {
    btn.classList.remove("animate__pulse");
  });
});

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    if (
      e.target.textContent === "+" ||
      e.target.textContent === "-" ||
      e.target.textContent === "/" ||
      e.target.textContent === "*" ||
      e.target.textContent === "%"
    ) {
      handleMultipleOperators(e);
    } else if (e.target.textContent === ".") {
      handleMultipleDots(e);
    } else if (e.target.textContent === "=") {
      resultContainer.style.display = "block";
      if (str[str.length - 2] === "/" && str[str.length - 1] === "0") {
        resultContainer.textContent = "Cannot be Divided by 0";
      } else {
        evaluatedStr = eval(str);
        resultContainer.textContent = evaluatedStr;
        input.value = str;
      }
    } else if (e.target.textContent === "C") {
      str = str.slice(0, str.length - 1);
      input.value = str;
    } else if (e.target.textContent === "AC") {
      str = "";
      input.value = "";
      resultContainer.textContent = "";
    } else {
      str = str + e.target.textContent;
      input.value = str;
    }

    // if (e.target.textContent === "=") {
    //     if (input.value === "") {
    //       return;
    //     } else {
    //       duplicateStr = str;
    //       str = eval(str);
    //       input.value = str;
    //       resultContainer.style.display = "block";
    //       resultContainer.textContent = duplicateStr;
    //     }
    //   } else if (e.target.textContent === "AC") {
    //     str = "";
    //     input.value = "";
    //     resultContainer.style.display = "none";
    //   } else if (e.target.textContent === "C") {
    //     str = str.slice(0, duplicateStr.length - 1);
    //     input.value = str;
    //   } else {
    //     input.value = "";
    //     // console.log(input.value)
    //     str = str + e.target.textContent;
    //     input.value = str;
    //     resultContainer.style.display = "none";
    //   }
  });
});

// handling multiple Operators

let lastChar;
let atLeastOneIncluded = undefined;
function handleMultipleOperators(e) {
  lastChar = [str[str.length - 1]];
  atLeastOneIncluded = operators.some((element) => lastChar.includes(element));
  if (atLeastOneIncluded) {
    if (
      e.target.textContent === "+" ||
      e.target.textContent === "-" ||
      e.target.textContent === "*" ||
      e.target.textContent === "/" ||
      e.target.textContent === "%"
    ) {
      return;
    }
  } else if (str === "") {
    if (
      e.target.textContent === "+" ||
      e.target.textContent === "-" ||
      e.target.textContent === "*" ||
      e.target.textContent === "/" ||
      e.target.textContent === "%"
    ) {
      return;
    }
  } else {
    str = str + e.target.textContent;
    input.value = str;
  }
}

//handling multiple Dots

function handleMultipleDots(e) {
  if (str === "" && e.target.textContent === ".") {
    str = str + "0.";
    input.value = str;
  } else if (str[str.length - 1] === "." && e.target.textContent === ".") {
    return;
  } else {
    str = str + e.target.textContent;
    input.value = str;
  }
}
