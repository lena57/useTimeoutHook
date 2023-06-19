import { useState, useEffect } from 'react';
import './App.css';
import useTimeout from './components/useTimeoutHook';

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
    <div className="App">
      <h3>useTimeout Hook</h3>
      <p>
        Create a hook to easily use setTimeout(callback, delay). Reset the timer
        if delay changes. DO NOT reset the timer if only callback changes.
      </p>

      <div>
        <label>Type a number of seconds your want to delay</label>
        <input type="number" value={delay} onChange={handleDelay} />
        <button onClick={sendDelay}>Delay</button>
        <p style={{ fontSize: '60px' }}>timer: {timer} sec</p>
      </div>

      <div>
        <label>Type a text for console.log</label>
        <input type="text" value={text} onChange={handleText} />
      </div>
    </div>
  );
}

export default App;
