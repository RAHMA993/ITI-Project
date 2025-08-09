import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

export default function Categories({ categories }) {
  return (
    <div className="container my-5">
      <h1 className="text-center m-4" style={{ color: '#cf2020' }}>Visit Our Store</h1>
      <div className='d-flex justify-content-between align-items-center'>
        {categories.map((cat, index) => (
          <div key={index} className="text-center px-3">
            <Link to={`/products/${cat.name.toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }}>
              <img
                src={cat.image}
                alt={cat.name}
                className="img-fluid rounded-circle category-img"
                style={{ width: '130px', height: '130px', objectFit: 'cover', margin: 'auto' }}
              />
              <h5 className="mt-2">{cat.name}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}