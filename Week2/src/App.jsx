import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Mycomponent from "./components/mycomponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Mycomponent></Mycomponent>
      </div>
    </>
  );
}

export default App;
