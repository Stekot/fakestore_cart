import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import {Product} from "./components/Product.types";
import {ProductList} from "./components/ProductList";
import {Cart} from "./components/Cart";

const App = () => {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [cart, setCart] = React.useState<Product[]>([]);
    const [loadStatus, setLoadStatus] = React.useState<"yes" | "no" | "error">("no");

    React.useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then(response => {
                setLoadStatus("yes");
                setProducts(response.data.slice(0, 10).map((product: any) => {
                    return {
                        id: product.id,
                        title: product.title,
                        description: product.description,
                        imageUrl: product.image,
                        price: product.price
                    }
                }));
            })
            .catch(error => {
                console.error("Failed to fetch the data", error);
                setLoadStatus("error");
            })
    }, []);

    const addToCart = (product: Product) => {
        if (!cart.includes(product)) {
            setCart([...cart, product]);
        } else {
            console.warn(`Product ${product.title} is already in the cart!`);
        }
    }

    const removeFromCart = (product: Product) => {
        if (cart.some(item => item.id === product.id)) {
            setCart(cart.filter((item) => item !== product));
        } else {
            console.warn(`Product ${product.title} is not in the cart!`);
        }
    }
    if (loadStatus === "error") {
        return (
            <div className="App">
                Failed to fetch the data
            </div>
        )
    } else if (loadStatus === "no") {
        return (
            <div className="App">
                Loading...
            </div>
        )
    } else if (loadStatus === "yes" && products.length === 0) {
        return (
            <div className="App">
                No data found
            </div>
        )
    }

    return (
        <div className="App">
            <h1>Fake Store</h1>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <ProductList products={products} cart={cart} addToCartHandler={addToCart}/>
                    </div>
                    <div className="col-md-4">
                        <Cart products={cart} removeFromCartHandler={removeFromCart}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;