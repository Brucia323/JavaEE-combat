import { Avatar, Badge, Row } from 'antd';
import { useState } from 'react';
import './App.css';
import Products from './components/Products';

const App = () => {
    const [products, setProducts] = useState([
        {
            name: 'apple',
            price: 30,
            img: 'http://www.iconninja.com/files/525/265/114/apple-red-icon.png'
        },
        {
            name: 'banana',
            price: 10,
            img: 'http://www.iconninja.com/files/790/279/636/banana-icon.png'
        },
        {
            name: 'orange',
            price: 20,
            img: 'http://www.iconninja.com/files/690/848/1015/orange-icon.png'
        }
    ])
    const [totalPrice, setTotalPrice] = useState(0)

    const handleTotalPrice = (action, changeValue) => {
        if (action === 'minus') {
            if (totalPrice - changeValue < 0) {
                return
            }
            setTotalPrice(totalPrice - changeValue)
        } else if (action === 'plus') {
            setTotalPrice(totalPrice + changeValue)
        }
    }

    return (
        <>
            <div style={{ margin: 24 }}>
                <Badge count={totalPrice} title={totalPrice} overflowCount={999}>
                    <Avatar src='http://www.iconninja.com/files/586/477/198/cart-icon.png' />
                </Badge>
            </div>
            <Row justify='center'>
                <Products products={products} handleTotalPrice={handleTotalPrice} />
            </Row>
        </>
    )
}

export default App;
