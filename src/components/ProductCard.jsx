import React, { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, addToCart, cart, increment, decrement, index }) {
  const [existsMsg, setExistsMsg] = useState('');

  function handleAdd() {
    const alreadyInCart = cart.some(item => item.id === product.id);

    if (alreadyInCart) {
      setExistsMsg('The Product already exists in cart !!');
      setTimeout(() => setExistsMsg(''), 3000);
    } else {
      if (product.quantity > 0) {
        addToCart({ ...product }); 
      } else {
        setExistsMsg('Please select quantity first');
        setTimeout(() => setExistsMsg(''), 3000);
      }
    }
  }

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={product.image}
          className="card-img-top p-3"
          alt={product.title}
          style={{ height: '250px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-muted">${product.price}</p>

          <div className="d-flex align-items-center mb-2">
            <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => decrement(product.id)}> - </button>
            <span className="me-2">Quantity: {product.quantity}</span>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => increment(product.id)}> + </button>
          </div>

          <div className="mt-auto">
            <button className="btn btn-dark me-2" onClick={handleAdd}>
              <FaCartPlus className="me-1" />
              Add to Cart
            </button>
            
            <Link to={`/product/${product.id}`} className="btn btn-outline-dark text-decoration-none">
              View Details
            </Link>
            
            {existsMsg && (
              <div className="text-danger mt-2">{existsMsg}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
