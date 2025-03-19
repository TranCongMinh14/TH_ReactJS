
import './App.css'
import { useReducer } from "react";

//khai bao bien
const initialState = {
  a: 0,
  b: 0,
  operator: "",
  result: ""
};

// dùng useReducer thay vì dùng useState để quản lý
function reducer(state, action) {
  switch (action.type) {
    case "SET_A":
      return { ...state, a: action.payload };
    case "SET_B":
      return { ...state, b: action.payload };
    case "SET_OPERATOR":
      return { ...state, operator: action.payload };
    case "CALCULATE": {
      let res = "";
      const a = parseInt(state.a);
      const b = parseInt(state.b);
      if (state.operator === "+") res = a + b;
      else if (state.operator === "-") res = a - b;
      else if (state.operator === "*") res = a * b;
      else if (state.operator === "/") res = b !== 0 ? a / b : "Không thể chia cho 0";
      return { ...state, result: res };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChangeA(e) {
    dispatch({ type: "SET_A", payload: e.target.value });
  }

  function handleChangeB(e) {
    dispatch({ type: "SET_B", payload: e.target.value });
  }

  function handleRadioChange(e) {
    dispatch({ type: "SET_OPERATOR", payload: e.target.value });
  }

  function handleClick() {
    dispatch({ type: "CALCULATE" });
  }

  return (
    <>
      <input onChange={handleChangeA} placeholder='Nhập a' type="text" />
      <br />
      <input onChange={handleChangeB} placeholder='Nhập b' type="text" />
      <br />
      
      <input onChange={handleRadioChange} type="radio" name="group" value="+" /><span>+</span>
      <input onChange={handleRadioChange} type="radio" name="group" value="-" /><span>-</span>
      <input onChange={handleRadioChange} type="radio" name="group" value="*" /><span>*</span>
      <input onChange={handleRadioChange} type="radio" name="group" value="/" /><span>/</span>
      <br />
      <button onClick={handleClick}>Click</button>
      <br />
      <span>Kết quả là: {state.result}</span>
    </>
  );
}

export default App;