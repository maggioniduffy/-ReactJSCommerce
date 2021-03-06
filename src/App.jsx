import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart, CheckOut } from './componentes'
import Styles from './Style.css'
import { commerce } from './lib/commerce'
import CartItem from './componentes/Cart/CartItem/CartItem'
import {
    BrowserRouter as Router,
    Switch, Route,
} from 'react-router-dom';


const App = () => {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMsg, setErrroMsg] = useState(null)
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, cantidad) => {
        const { cart } = await commerce.cart.add(productId, cantidad)
        setCart(cart)

    }

    const handleUpdateCartCant = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })
        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart)
    }
    const fetchProds = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        console.log("CHECKOUTID y newOrder: ", checkoutTokenId, newOrder)
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
            alert("INCOMING")
            setOrder(incomingOrder)
            refreshCart()
        } catch (error) {
            console.log("ERROR", error)
            setErrroMsg(error.data.error.message)
        }
    }
    useEffect(() => {
        fetchProds();
        fetchCart();
    }, []);

    return (
        <Router>
            <div >
                <Navbar totalItems={cart.total_items}></Navbar>
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} onAddToCart={handleAddToCart}></Products>
                    </Route>
                    <Route exact path='/cart'>
                        <Cart
                            cart={cart}
                            handleUpdateCartCant={handleUpdateCartCant}
                            handleEmptyCart={handleEmptyCart}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />
                    </Route>
                    <Route exact path='/checkout'>
                        {cart && <CheckOut
                            cart={cart}
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            erorr={errorMsg}
                            emptyCart={handleEmptyCart} />}
                    </Route>
                </Switch>
            </div >
        </Router>
    )
}

export default App;
