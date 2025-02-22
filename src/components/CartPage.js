import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";


export default function Cart() {
    const [savedItems, setSavedItems] = useState(null);
    const location = useLocation();
    useEffect(() => {

        if (location.state && location.state.savedItems) {
            setSavedItems(location.state.savedItems);
            // Set user if available in location state
        }
    }, [location]);

    return (
        <div>
            {savedItems == null || savedItems.length === 0 ? (
                <p>No items</p>
            ) : (
                savedItems.reduce((acc, item) => {
                    // Find if the item already exists in the accumulator
                    const existingItem = acc.find(i => i.name === item.name);
                    if (existingItem) {
                        existingItem.count += 1;  // Increase count if item already exists
                    } else {
                        acc.push({...item, count: 1});  // Add new item with count 1
                    }
                    return acc;
                }, []).map((item, index) => {
                    return (
                        <div key={index}>
                            <img src={item.imageList[0]} alt=""/>
                            <p>{item.name} (x{item.count})</p> {/* Display count */}
                            <p>{item.price}</p>
                            <p>+</p>
                            <p>-</p>
                        </div>
                    );
                })
            )}
            <div>
                <p>Total price {savedItems ? savedItems.reduce((total, item) => total + item.price, 0) : 0}</p>
            </div>
        </div>

    );
}
