import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pageButtons, paginate } from '../util'
class productView extends Component {
  constructor (props) {
    super(props)
    this.state = { products: paginate(props.products, 1), page: 1 }
  }
  onClick () {
    return (e) => {
      const page = parseInt(e.target.textContent, 10)
      const { products } = this.props
      const newProducts = paginate(products, page)
      this.setState({ products: newProducts, page })
    }
  }

  createButtons () {
    const { products } = this.props
    const totalPages = pageButtons(products)
    return new Array(totalPages).fill(0).map((e, i) => <PageButton e={i + 1} i={i} page={this.state.page} onClick={this.onClick()} />)
  }
  render () {
    return <div>
      <div className='products-view'>
        {this.state.products.map((e, i) => <Products name={e.name} prize={e.prize} index={i} />)}
      </div>
      <div className='pagination'>
        {this.createButtons()}
      </div>
      <style jsx>{`
      .products-view {
          display: flex;
          flex-wrap: wrap;
      }
      .pagination {
          display: flex;
          justify-content: center;  
          padding: 2em 0;  
      }
      `}</style>
    </div>
  }
}

const PageButton = ({ e, i, onClick, page }) => {
  let pickedPage

  if (e === page) {
    pickedPage = '#c0c9df'
  }

  return <span onClick={onClick} className='page-button' index={i}>
    {e}
    <style jsx>{`.page-button {
    display: inline-block;
    padding: .6em;
    cursor: pointer;
    background: ${pickedPage || 'var(--grey-color)'};
    margin: 0 .5em;
}`}</style>
  </span>
}

const Products = ({ name, prize, index }) => <section className='product' index={index}>
  <h3>{name}</h3>
  <div className='product__prize'>
    <span className='product__label'>prize</span>
    &nbsp;&nbsp;
    <span className='product__value'>{prize}</span>
  </div>
  <span className='cart-button' disabled>
        Add to cart
  </span>
  <style jsx>{`
    .product {
        padding: 1rem 0;
        width: 100%;
        text-align: center;
    }
    h3 {
        font-family: 'Montserrat', sans-serif;
    }
    @media (min-width: 480px) {
        .product {
            max-width: 50%;
        }
        
    }
    @media (min-width: 768px) {
        .product {
            max-width: 33.333333%;
        }
        
    }
    .product__prize {
        margin: 1rem 0;
    }
    .cart-button {
        display: inline-block;
        padding: .6rem 2rem;
        background: var(--fourth-color);
        color: white;
        cursor: pointer;
    }
  
  `}</style>
</section>

const mapStateToProps = ({ products }) => {
  return { products }
}

export default connect(mapStateToProps)(productView)
