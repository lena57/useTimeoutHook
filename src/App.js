import { useState, useEffect } from 'react';
import './App.css';
import useTimeout from './components/useTimeoutHook';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [timer, setTimer] = useState(0);
  const [delay, setDelay] = useState(0);
  const [text, setText] = useState('');

  const handleDelay = (e) => {
    setDelay(+e.target.value);
  };

  const sendDelay = () => {
    setTimer(delay);
    setDelay('');
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const delayCallback = () => {
    console.log(text);
  };

  useTimeout(() => {
    delayCallback();
  }, timer * 1000);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => {
          return prev > 0 ? prev - 1 : prev;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  return (
    <div className='App'>
    <div className="container flex-column align-items-center">
      <h3>useTimeout Hook</h3> 
      <p>
        Create a hook to easily use setTimeout(callback, delay). Reset the timer
        if delay changes. DO NOT reset the timer if only callback changes.
      </p>

      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Delay in sec</span>
        <input type="text" className="input-group-text" 
        aria-label="Sizing example input" 
        aria-describedby="inputGroup-sizing-default"
        value={delay} onChange={handleDelay}/>
        <button className="btn btn-outline-success" type="button"
         onClick={sendDelay}>Delay</button>

      </div>
      <div>
        <p style={{ fontSize: '40px' }}>timer: {timer} sec</p>

      </div>

      <div className="input-group mb-3">
      <span className="input-group-text" id="inputGroup-sizing-default">Type a text</span>
        <input type="text" className="input-group-text" 
        aria-label="Sizing example input" 
        aria-describedby="inputGroup-sizing-default"
        value={text} onChange={handleText}/>

      </div>
    </div>
    </div>
  );
}

export default App;
