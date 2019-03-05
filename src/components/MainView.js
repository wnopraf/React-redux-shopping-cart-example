import React from 'react'
import ProductView from './ProductsView'
import Cart from './Cart'
export default () => <div className='main-view'>
  <div className='cart-view'>
    <Cart />
  </div>
  <div className='product-view'>

    <ProductView />

  </div>

  <style jsx>{`
        .main-view {
          
        }
        .product-view {
          position: relative;
         
        }
        
        .cart-view {
         
        }
       
    
    `}</style>
</div>
