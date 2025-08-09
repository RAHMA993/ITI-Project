import React, { useState, useEffect} from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Nav from './components/Nav';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import Footer from './components/Footer.jsx';
import Products from './pages/Products.jsx';
import Categories from './components/Categories.jsx';
import Cart from './pages/Cart.jsx';
import Error from './components/Error.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Checkout from './pages/Checkout.jsx';

const categories = [
  {
    name: 'Shoes',
    image: '/Shoes.jpg',
    link: '/products'
  },
  {
    name: 'Scarves',
    image: '/scarves.jpg',
    link: '/products'
  },
  {
    name: 'Bags',
    image: '/bag.jpg',
    link: '/products'
  },
  {
    name: "Women's Clothing",
    image: '/Clothes.jpg',
    link: '/products'
  },
  {
    name: 'Jewelery',
    image: '/Accessories.jpg',
    link: '/products'
  }
]
const manualProducts = [
      {
          id: 9991,
          title: "Bela Bag",
          price: 39.99,
          category: "bags",
          image: "/bag1.jpg"
      },
      {
          id: 9992,
          title: "Celine Bag",
          price: 24.99,
          category: "bags",
          image: "/celine-bag.jpg"
      },
      {
          id: 9993,
          title: "Every day backpack",
          price: 24.99,
          category: "bags",
          image: "/every-day-backpack.jpg"
      },
      {
          id: 9994,
          title: "Serpentine Bag",
          price: 24.99,
          category: "bags",
          image: "/serpentine-bag.jpg"
      },
      {
          id: 9995,
          title: "Casual Bag",
          price: 24.99,
          category: "bags",
          image: "/serpentine.jpg"
      },
      {
          id: 9996,
          title: "Basham Bag",
          price: 24.99,
          category: "bags",
          image: "/basham-bag.jpg"
      },
      
      {
          id: 1000,
          title: "Soft Scarf",
          price: 19.99,
          category: "scarves",
          image: "/soft-scarf.jpg"
      },
      {
          id: 1005,
          title: "Soft Scarf",
          price: 19.99,
          category: "scarves",
          image: "/soft-scarf2.jpg"
      },
      {
          id: 10010,
          title: "Silk Scarf",
          price: 25.50,
          category: "scarves",
          image: "/silk-scarf.jpg"
      },
      {
          id: 10012,
          title: "Silk Scarf",
          price: 26.99,
          category: "scarves",
          image: "/silk-scarf2.jpg"
      },
      {
          id: 10015,
          title: "Wool Scarf",
          price: 24.99,
          category: "scarves",
          image: "/wool-scarf.jpg"
      },
      {
          id: 10016,
          title: "Wool Scarf",
          price: 25.00,
          category: "scarves",
          image: "/wool-scarf2.jpg"
      },

      {
          id: 10021,
          title: "Running Shoes",
          price: 49.99,
          category: "shoes",
          image: "/running-shoes.jpg"
      },
      {
          id: 10022,
          title: "Heel Shoes",
          price: 120.50,
          category: "shoes",
          image: "/heel-shoes.jpg"
      },
      {
          id: 10025,
          title: "Heel Shoes",
          price: 120.50,
          category: "shoes",
          image: "/heel-shoes2.jpg"
      },
      {
          id: 10026,
          title: "Casual Sneakers",
          price: 39.99,
          category: "shoes",
          image: "/casual-sneakers.jpg"
      },
      {
          id: 10028,
          title: "Casual Sneakers",
          price: 40.95,
          category: "shoes",
          image: "/casual-sneakers2.jpg"
      }
  ];

function App() {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      if (storedUser) {
        setCurrentUser(storedUser);
        const userCart = JSON.parse(localStorage.getItem(`cart_${storedUser.email}`) || '[]');
        setCart(userCart);
      } else {
        setCart([]); // Ensure cart is empty if no user is logged in
      }
    }, []);

  return (
    <>
      <BrowserRouter>
      <Nav cart={cart} currentUser={currentUser} setCurrentUser={setCurrentUser} setCart={setCart} />
        <Routes>
          <Route path="/" element={<Home categories={categories} />} />
          <Route path="/signin" element={<Signin setCurrentUser={setCurrentUser} setCart={setCart} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/products/:categoryId" element={<Products manualProducts={manualProducts} cart={cart} setCart={setCart} currentUser={currentUser} />} />
          <Route path="/products" element={<Products manualProducts={manualProducts} cart={cart} setCart={setCart} currentUser={currentUser} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} currentUser={currentUser} />} />
          <Route path="/product/:id" element={<ProductDetails manualProducts={manualProducts} />} />
          <Route path="/checkout" element={<Checkout cart={cart} currentUser={currentUser} setCart={setCart} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

