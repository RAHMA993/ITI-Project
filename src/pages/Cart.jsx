import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Cart({ cart, setCart, currentUser }) {
  const navigate = useNavigate();

  useEffect(() => {
      if (!currentUser) {
        navigate('/signin');
      }
    }, [currentUser, navigate]);
  
  const removeFromCart = (id) => {
  const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(updatedCart));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty!!</p>
      ) : (
        <>
          <div className="row">
            {cart.map((product, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top p-3"
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-muted">Unit Price: ${product.price}</p>
                    <p className="card-text">Quantity: {product.quantity}</p>
                    <p className="card-text fw-bold">
                      Total: ${(product.price * product.quantity).toFixed(2)}
                    </p>
                    <button
                      className="btn btn-outline-dark mt-auto d-flex justify-content-center align-items-center gap-2 btn-sm rounded-pill px-3"
                      onClick={() => removeFromCart(product.id)}>
                        <FaTrash />
                        Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h4 className="text-end">Total Cart: ${totalPrice.toFixed(2)}</h4>

          <div className="text-end mt-3 mb-3">
            <button className="btn btn-dark" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>

          <div className="text-end">
            <Link to="/products" className="btn btn-dark mb-4">Back</Link>
          </div>
        </>
      )}
    </div>
  );
}
