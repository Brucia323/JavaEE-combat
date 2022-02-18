import { MinusOutlined, PlusOutlined } from '@ant-design/icons/lib/icons'
import { Card, Image } from 'antd'
import { useState } from 'react'

const Product = props => {
    const [loading, setLoading] = useState(true)

    const handleMinus = () => {
        props.handleTotalPrice('minus', props.product.price)
    }

    const handlePlus = () => {
        props.handleTotalPrice('plus', props.product.price)
    }

    const handleLoading = () => {
        setLoading(false)
    }

    return (
        <Card
            cover={
                <Image
                    alt={props.product.name}
                    src={props.product.img}
                    onLoad={handleLoading}
                    style={{ width: 128, height: 128 }}
                    preview={false}
                    placeholder={loading}
                />
            }
            actions={[
                <MinusOutlined key='minus' onClick={handleMinus} />,
                <PlusOutlined key='plus' onClick={handlePlus} />,
            ]}
            hoverable={true}
        >
            <Card.Meta
                title={props.product.name}
                description={'$' + props.product.price}
            />
        </Card>
    )
}

export default Product
