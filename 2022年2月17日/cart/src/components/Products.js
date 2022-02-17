import { Space } from "antd"
import Product from "./Product"

const Products = (props) => {
    return (
        <Space>
            {
                props.products.map((product, index) => {
                    return (
                            <Product product={product} key={index} handleTotalPrice={props.handleTotalPrice} />
                    )
                })
            }
        </Space>
    )
}

export default Products
