import React, { Component, Fragment } from 'react'
import './ShoppingCart.css'

const app = {
    title: 'Shopping Cart',
    year: new Date().getFullYear()
}

const products = [
    { item: "Camera", price: 500 },
    { item: "Shoes", price: 150 },
    { item: 'Hand Bag', price: 700 },
    { item: 'Smart Phone', price: 1200 },
    { item: 'Sweater', price: 120 },
    { item: 'Watch', price: 600 },
    { item: 'Headphones', price: 300 },
    { item: 'Book', price: 20 },
    { item: 'Ring', price: 3000 }
]

export class ProductCart extends Component {

    state = {
        products: products.map((prod, index)=>({id:index, item:prod.item, price:prod.price})),
        cart: []
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let qtd = e.target.elements.qtd.value;
        let productId = e.target.elements.products.value;
        let product = this.getProductById(productId);
        
        if (product && qtd) {
            let newItem = {qtd: qtd, product: product};

            this.setState((prevState) => {
                return { cart: prevState.cart.concat(newItem) }
            })

            e.target.elements.products.value = '';
            e.target.elements.qtd.value = '';
        }
    }
    
    getProductById = (id) => {
        return products[id];
    }

    getProductList = (productsArr) => {
        let list = productsArr.map((product, index) => <option key={index} value={product.id} >{product.item} - ${product.price}</option>)
        return list
    }

    makeCartList = (todoArr) => {
        let list = todoArr.map((item, index) => 
            <tr key={index} >
                <td>
                    {item.qtd}
                </td>
                <td>
                    {item.product.item}
                </td>
                <td>
                    $ {item.product.price}
                </td>
                <td>
                    <button className='remove' onClick={function() { this.handleRemoveItem(item.id); }} >X</button>
                </td>
            </tr>)

        return (<table>
            <thead>
                <tr>
                    <th>Qtd</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>);
    }

    handleRemoveItem = (prodId) => {
        alert(prodId)
    }

    handleRemoveAll = () => {
        this.setState(() => {
            return { cart: [] }
        })
    }

    render() {
        return (
            <Fragment>
                <header>
                    <h1>{app.title}</h1>
                </header>
                <main>
                    <form style={{textAlign:'center'}} onSubmit={ this.handleSubmit } >
                        <select name="products">
                            <option value="">Select a product</option>
                            {this.getProductList(this.state.products)}
                        </select>
                        <input type='number' name='qtd' placeholder='Qtd' />
                        <button type='submit'>Add</button>
                    </form>
                    <br/>
                    <div>
                        { this.state.cart.length > 0 ? 
                            this.makeCartList(this.state.cart) : 
                            <div className='box'><p>Shopping cart is empty.</p></div> }
                    </div> 
                    <br/>
                    <div>
                        { this.state.cart.length > 0 && <button className='remove' type='button' onClick={this.handleRemoveAll }>Remove all</button> }
                    </div>
                </main>
                <footer>
                    <p>For educational use © {app.year}</p>
                </footer>
            </Fragment>
        )
    }
}

export default ProductCart;