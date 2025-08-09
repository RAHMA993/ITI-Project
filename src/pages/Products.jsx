import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Products({ manualProducts, cart, setCart, currentUser }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const filteredProducts = products.filter(p => {
    const matchCategory = categoryId
      ? p.category.toLowerCase() === categoryId.toLowerCase()
      : true;
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const apiData = await res.json();

        const filteredData = apiData.filter(
          p => !["men's clothing", "electronics", "scarves", "shoes"].includes(p.category)
        );

        const updatedData = [...filteredData, ...manualProducts].map(p => ({
          ...p,
          quantity: 1
        }));

        setProducts(updatedData);

        const catRes = await fetch('https://fakestoreapi.com/products/categories');
        let catData = await catRes.json();
        catData = catData.filter(c => !["men's clothing", "electronics", "scarves", "shoes"].includes(c));
        setCategories([...catData, 'bags', 'scarves', 'shoes']);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [manualProducts]);

  const increment = (id) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decrement = (id) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id && p.quantity > 0
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  const addToCart = (product) => {
    if (!currentUser) return navigate('/signin');
    if (!cart.some(item => item.id === product.id)) {
      const updatedCart = [...cart, { ...product, quantity: product.quantity }];
      setCart(updatedCart);
      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">Our Products</h2>

      {/* Search */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by product name..."
          className="form-control w-50 mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="text-center mb-4">
        {categories.map((cat, index) => (
          <button
            key={index}
            className="btn btn-outline-dark m-2"
            onClick={() => navigate(`/products/${cat}`)}
          >
            {cat}
          </button>
        ))}
      </div>

      <h1>{categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : "All Products"}</h1>
      {filteredProducts.length === 0 && <p>No products found.</p>}

      <div className="row">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            cart={cart}
            index={index}
            increment={() => increment(product.id)}
            decrement={() => decrement(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
