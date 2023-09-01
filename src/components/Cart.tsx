import {Product} from "./Product.types";

type CartProps = {
    products: Product[];
    removeFromCartHandler: (product: Product) => void;
}

export const Cart = ({products, removeFromCartHandler}: CartProps) => {
    const totalPrice = products.reduce((total, product) => total + product.price, 0);
    return (
        <div>
            <h2>Cart</h2>
            <ul className="list-unstyled">
                {products.map((product) => (
                        <li key={product.id}>
                            <h5>{product.title}</h5>
                            <p>{product.price}</p>
                            <button onClick={() => removeFromCartHandler(product)}>
                                Remove from cart
                            </button>
                        </li>
                    )
                )}
            </ul>

            <h3>Total {totalPrice}</h3>
         </div>
    )
}