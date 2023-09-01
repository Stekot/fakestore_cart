import {Product} from "./Product.types";

type ProductListProps = {
    products: Product[];
    cart: Product[];
    addToCartHandler: (product: Product) => void;
}


export const ProductList = ({products, cart, addToCartHandler}: ProductListProps) => {
    return (
        <div>
            <h2>Products</h2>
            <ul className="list-unstyled">
                {products.map((product) => (
                        <li key={product.id}>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <img src={product.imageUrl} alt={product.title} width="100"/>
                            <p>{product.price}</p>
                            <button
                                onClick={() => addToCartHandler(product)}
                                disabled={cart.some(item => item.id === product.id)}
                            >
                                Add to cart
                            </button>
                        </li>
                    )
                )}
            </ul>
        </div>
    )
}