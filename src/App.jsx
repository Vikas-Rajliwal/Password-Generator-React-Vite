import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
    if (numberAllowed) str += "01234567890";
    if (charAllowed) str += "!@#$%^&";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllowed, charAllowed, setpassword]);
  useEffect(() => {
    passwordGenrator();
  }, [numberAllowed, length, charAllowed, passwordGenrator]);
  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <h1 className="heading">Password Generator</h1>

      <div>
        <div className="main">
          <input
            type="text"
            value={password}
            placeholder="password"
            readOnly
            className="input"
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="button">copy</button>
        </div>
        <div className="main">
          <input
            type="range"
            min={10}
            max={30}
            value={length}
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label>length:{length}</label>
        </div>
        <div className="main">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numbeerInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>Number Allowed: {numberAllowed}</label>
        </div>
        <div className="main">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>char Allowed: {charAllowed}</label>
        </div>
      </div>
    </>
  );
}

export default App;
