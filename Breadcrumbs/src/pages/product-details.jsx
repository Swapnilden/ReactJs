import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
                fetch(`https://dummyjson.com/products/${id}`)
                .then(res => res.json())
                .then((res) => {
                    setProduct(res);
                })
            }, [])

    return (
        <div>
            <h2>Product Details Page</h2>
            {product ? (<div style={{display: "flex" }}>
                <img src={product.thumbnail} alt={product.id} style={{height: 300}}/>
                <div>
                    <h3>{product.title}</h3>
                    <h3>${product.price}</h3>
                    <h3>{product.description}</h3>
                </div>
            </div>):
                (<div>Loading...</div>)
            }
        </div>
    )
}

export default ProductDetails;