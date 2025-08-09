import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetails({ manualProducts = [] }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const local = manualProducts.find(p => p.id.toString() === id.toString());
    if (local) {
      if (mounted) {
        setProduct(local);
        setLoading(false);
      }
      return () => { mounted = false; };
    }

    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error('Product not found on API');
        }
        const data = await res.json();
        if (mounted) {
          setProduct(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Error fetching product');
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => { mounted = false; };
  }, [id, manualProducts]);

  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <h3>Error</h3>
        <p>{error}</p>
        <p><Link to="/products" className="btn btn-outline-dark">Back to Products</Link></p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <h3>Product not found</h3>
        <p><Link to="/products" className="btn btn-outline-dark">Back to Products</Link></p>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={product.image || product.img}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: 450, objectFit: 'contain' }}
          />
        </div>

        <div className="col-md-6">
          <h2>{product.title}</h2>
          {product.category && <p className="text-muted">{product.category}</p>}
          <h4 className="mb-3">${product.price}</h4>
          {product.description && <p>{product.description}</p>}

          <div className="mt-4">
            <Link to="/products" className="btn btn-dark me-2 ">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
