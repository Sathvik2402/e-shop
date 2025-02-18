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
            {savedItems==null?<p>No items</p>:savedItems.map((item, index) => {
                return (
                    <div key={index}>
                        <img src={item.imageList[0]} alt="" />
                        <p>{item.description}</p>
                    </div>
                );
            })}
        </div>
    );
}
