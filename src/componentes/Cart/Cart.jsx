import React from 'react'
import {
    Container,
    Typography,
    Button,
    Grid
} from '@material-ui/core'
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleUpdateCartCant, handleRemoveFromCart, handleEmptyCart }) => {

    const classes = useStyles();
    const EmptyCart = () => (

        <Typography variant='h3'> No items in the cart.
            <Link to='/' className={classes.link}> <Typography variant='h1'> Buy someones! </Typography></Link>
        </Typography>
    )

    const FilledCart = () => (
        <div>

            <Grid container justify='center' spacing={3}>

                {cart.line_items.map((item) => (
                    <Grid item className={classes.card} xs={12} sm={4} key={item.id} >
                        <CartItem item={item} onUpdateCant={handleUpdateCartCant} onUpdateRemove={handleRemoveFromCart}></CartItem>
                    </Grid>
                ))
                }
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4'>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton}
                        size='large' type='button' variant='contained'
                        color='secondary'
                        onClick={handleEmptyCart}>
                        Empty Cart
                    </Button>
                    <Button className={classes.checkoutButton}
                        component={Link} to='/checkout'
                        size='large' type='button' variant='contained'
                        color='primary'>
                        Checkout
                    </Button>
                </div>
            </div>
        </div >


    )

    if (!cart.line_items) {
        return 'Loading..';
    }
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography gutterBotom className={classes.title} variant='h1'>
                Your Cart
                    </Typography>
            {
                !(cart.line_items).length ? (<EmptyCart></EmptyCart>) : <FilledCart></FilledCart>}
        </Container>
    )



}

export default Cart;
