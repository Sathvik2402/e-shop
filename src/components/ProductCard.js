import React from "react";
import ImageCarousel from "./ImageCarousel";
import productcard from "./ProductCard.css";
import {useNavigate} from "react-router-dom";

export default function ProductCard({product,username}){
const [cart, setCart] = React.useState(null);
    const navigate = useNavigate();
    const handleaddToCart = async () => {
        try {
            const response = await fetch('http://localhost:8086/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,    // First JSON object
                    product, // Second JSON object
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }
            const mydto = await response.json();
            setCart(mydto);
            navigate('/', { state: { mydto } });
            console.log('Response:', mydto);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
    <div className="product-card">
        <div>
            <ImageCarousel images={product.imageList}/>
            {product.imageList.length}
        </div>
        <div className="product-content">
            <h3>{product.name}<br/>{product.price.toFixed(2)}</h3>
            <div className="addtocart" onClick={handleaddToCart}>ADD TO CART</div>
            {/*<div className="addtocart" >{userU && userU.savedItems.length}</div>*/}
        </div>
    </div>
);

}