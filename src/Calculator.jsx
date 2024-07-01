import { useState } from "react";

function App() {
  const [answer, setAnswer] = useState("0");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = function (symbol) {
    return /[*/+-]/.test(symbol);
  };

  const handleClick = function (symbol) {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = function () {
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression).toString());
    } else {
      setAnswer(eval(newExpression).toString());
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>Calculator</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button id="clear" onClick={() => handleClick("clear")}>
            AC
          </button>
          <button
            id="divide"
            className="operation"
            onClick={() => handleClick("/")}
          >
            /
          </button>
          <button
            id="multiply"
            className="operation"
            onClick={() => handleClick("*")}
          >
            *
          </button>
          <button id="seven" onClick={() => handleClick("7")}>
            7
          </button>
          <button id="eight" onClick={() => handleClick("8")}>
            8
          </button>
          <button id="nine" onClick={() => handleClick("9")}>
            9
          </button>
          <button
            id="subtract"
            className="operation"
            onClick={() => handleClick("-")}
          >
            -
          </button>
          <button id="four" onClick={() => handleClick("4")}>
            4
          </button>
          <button id="five" onClick={() => handleClick("5")}>
            5
          </button>
          <button id="six" onClick={() => handleClick("6")}>
            6
          </button>
          <button
            id="add"
            className="operation"
            onClick={() => handleClick("+")}
          >
            +
          </button>
          <button id="one" onClick={() => handleClick("1")}>
            1
          </button>
          <button id="two" onClick={() => handleClick("2")}>
            2
          </button>
          <button id="three" onClick={() => handleClick("3")}>
            3
          </button>
          <button id="equals" onClick={() => handleClick("=")}>
            =
          </button>
          <button id="zero" onClick={() => handleClick("0")}>
            0
          </button>
          <button id="decimal" onClick={() => handleClick(".")}>
            .
          </button>
        </div>
        <p id="me">
          Designed and Coded by <a href="https://github.com/OB-Adams">OB</a>
        </p>
      </div>
    </>
  );
}

export default App;
