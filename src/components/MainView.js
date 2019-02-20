import React from 'react'

import ProductView from './ProductsView'
export default () => <div className='main-view'>
  <div className='product-view'>
    <ProductView />
    <style jsx>{`
        
       @media (min-width: 768px) {
        .product-view {

            min-width: 75%;
        }
       }
    
    `}</style>
  </div>
  <div className='cart-view'>
    <style jsx>{`
            .cart-view {
                display: none;
                font-size: 1.6rem
            }
            @media (min-width: 768px) {
                .cart-view {
                    display: block;
                }
            }
            
        `}</style>
  </div>
</div>
