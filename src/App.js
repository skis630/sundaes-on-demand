import { useState } from "react";
import "./App.css";

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [disabled, toggleDisabled] = useState(false);
  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div>
      <button
        style={{
          backgroundColor: disabled ? "gray" : buttonColor,
          color: "white",
        }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {newButtonColor}
      </button>
      <br />
      <input
        type="checkbox"
        defaultChecked={false}
        onChange={(e) => toggleDisabled(e.target.checked)}
      />
    </div>
  );
}

export default App;
