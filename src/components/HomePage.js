import React, { useState,useEffect } from "react";
import axios from "axios";
import homepage from "./HomePage.css";
import ProductCard from "./ProductCard";
import {useNavigate,useLocation} from 'react-router-dom';



export default function HomePage() {
    const [response, setResponse] = useState([]); // Assuming the API returns an array of products
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    const [cart, setCart] = useState(null);
    const [user, setUser] = useState(null);


    const callApi = () => {
        axios
            .get("http://localhost:8090/all")
            .then((response) => setResponse(response.data)) // Assuming the response is an array of products
            .catch((error) => console.log(error));
    };

    /*const getProductDetails = (productId) => {
        setLoading(true);  // Set loading to true while the API call is being made
        axios
            .get(`http://localhost:8090/id?id=${productId}`)
            .then((response) => {
                setProductDetails(response.data);  // Set the product details in state
                setLoading(false);  // Set loading to false once the data is fetched
            })
            .catch((error) => {
                console.error("Error fetching product details:", error.toString());
                setError("Error fetching product details.");
                setLoading(false);
            });
    };*/

    const location = useLocation();
    useEffect(() => {

        if (location.state && location.state.result) {
            setUser(location.state.result);
           // Set user if available in location state
        }
        if(location.state && location.state.mydto) {
            setUser(location.state.mydto);
        }
    }, [location]);

const navigate = useNavigate();
    const handleLoginClick=()=>{
    navigate("/login");
    };
const handleLogoutClick=()=>{
navigate("/logout");
}
const handleCartClick=(savedItems)=> {
navigate("/cart",{state:{savedItems}});
}

    return (
        <>
            <nav className="navbar">
                <ul className="button-list">
                    <li>
                        Home
                    </li>
                    <li>
                        Orders
                    </li>
                    <li>
                        Settings
                    </li>
                    {user == null ?
                        <li onClick={handleLoginClick}>
                            Login
                        </li> : (
                            <>
                                <li>{user.username}
                                </li>
                                <li onClick={handleLogoutClick}>Logout
                                </li>
                            </>)
                    }

                    <li onClick={()=>handleCartClick(user.savedItems)}>
                        Cart {user==null?"0":user.savedItems.length}
                    </li>
                </ul>
            </nav>

            <div style={{color: 'darkgrey'}}>
                <h2>THE SHOP</h2>

                <div className='homebutton' onClick={callApi}>
                    Get Products
                </div>
                {error && <p style={{color: "red"}}>{error.toString()}</p>}
                {/* Render the list of products */}
                {response.length > 0 ? (
                    <div className="product-list">
                        {response.map((product, index) => (
                            <>
                                <div key={index}>
                                    {user==null? <ProductCard product={product}  />
                                        :<ProductCard product={product} username={user.username} />}

                                </div>
                                <p>
                                    {productDetails == null ? "" : (productDetails.name == product.name ? product.name : "")}
                                </p>
                            </>
                        ))}
                    </div>
                ) : (
                    "Empty!"
                )}

            </div>
        </>
            );
            }
