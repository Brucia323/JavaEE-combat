import { useRef, useState } from 'react';
import './App.css';

const App = () => {
    const [count, setCount] = useState(0);
    const interval = useRef(null)

    const add = () => {
        if (count !== 0) {
            clearInterval(interval.current)
        }
        interval.current = setInterval(() => {
            setCount(prevCount => prevCount + 1)
        }, 1000)
    }

    const reduce = () => {
        if (count !== 0) {
            clearInterval(interval.current)
        }
        interval.current = setInterval(() => {
            setCount(prevCount => prevCount - 1)
        }, 1000)
    }

    return (
        <div>
            <button onClick={add}>正向计时</button>
            <button onClick={reduce}>反向计时</button>
            <span>{count}</span>
        </div>
    )
}

export default App;
