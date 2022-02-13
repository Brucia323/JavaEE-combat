import { useState } from 'react';
import './App.css';

const App = () => {
    const [number1, setNumber1] = useState()
    const [method, setMethod] = useState('addition')
    const [number2, setNumber2] = useState()
    const [result, setResult] = useState()

    const handleNumber1 = (event) => {
        setNumber1(event.target.value)
    }

    const handleMethod = (event) => {
        setMethod(event.target.value)
    }

    const handleNumber2 = (event) => {
        setNumber2(event.target.value)
    }

    const calculate = () => {
        if (isNaN(Number(number1)) || isNaN(Number(number2))) {
            return
        }
        if (method === 'addition') {
            setResult(Number(number1) + Number(number2))
        } else if (method === 'subtraction') {
            setResult(Number(number1) - Number(number2))
        } else if (method === 'multiplication') {
            setResult(Number(number1) * Number(number2))
        } else if (method === 'division') {
            if (Number(number2) !== 0) {
                setResult(Number(number1) / Number(number2))
            } else {
                setResult('不能除以0')
            }
        }
    }

    return (
        <div>
            <input type='number' placeholder='请输入数字...' value={number1} onChange={handleNumber1} />
            <select value={method} onChange={handleMethod}>
                <option value='addition'>+</option>
                <option value='subtraction'>-</option>
                <option value='multiplication'>x</option>
                <option value='division'>÷</option>
            </select>
            <input type='number' placeholder='请输入数字...' value={number2} onChange={handleNumber2} />
            <button onClick={calculate}>=</button>
            <input type='text' placeholder='结果' value={result} readOnly />
        </div>
    )
}

export default App;
