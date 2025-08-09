import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import './signin.css';
import img from '../assets/signin.jpg';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

function Signin({ setCurrentUser, setCart }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  return (
    <div className="all">
      <div className="login">
        <div className="r-section">
          <h2>Welcome To Our Store</h2>
          <br /><br />
          <div className="img">
            <img src={img} alt="Sign in" />
          </div>
        </div>
        <div className="l-section">
          <h2>SIGN IN</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SigninSchema}
            onSubmit={(values, { setSubmitting }) => {
              const users = JSON.parse(localStorage.getItem('users') || '[]');
              const user = users.find(
                (u) => u.email === values.email && u.password === values.password
              );
              if (user) {
                setError('');
                setCurrentUser(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                // Load the user's cart from localStorage
                const userCart = JSON.parse(localStorage.getItem(`cart_${user.email}`) || '[]');
                setCart(userCart);
                navigate('/');
              } else {
                setError('Invalid email or password');
                setCart([]); // Clear cart on invalid login
              }
              setSubmitting(false);
            }}
          >
            <Form>
              <div className="form-control">
                <Field type="email" name="email" required />
                <label>
                  <span style={{ transitionDelay: '0ms' }}>E</span>
                  <span style={{ transitionDelay: '50ms' }}>m</span>
                  <span style={{ transitionDelay: '100ms' }}>a</span>
                  <span style={{ transitionDelay: '150ms' }}>i</span>
                  <span style={{ transitionDelay: '200ms' }}>l</span>
                </label>
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-control">
                <Field type="password" name="password" required />
                <label>
                  <span style={{ transitionDelay: '0ms' }}>P</span>
                  <span style={{ transitionDelay: '50ms' }}>a</span>
                  <span style={{ transitionDelay: '100ms' }}>s</span>
                  <span style={{ transitionDelay: '150ms' }}>s</span>
                  <span style={{ transitionDelay: '200ms' }}>w</span>
                  <span style={{ transitionDelay: '250ms' }}>o</span>
                  <span style={{ transitionDelay: '300ms' }}>r</span>
                  <span style={{ transitionDelay: '350ms' }}>d</span>
                </label>
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              {error && (
                <div className="error" style={{ color: '#070202ff', marginTop: '10px' }}>
                  {error}
                </div>
              )}
              <button type="submit">Sign In</button>
              <div className="signup">
                <p>
                  New User?{" "}
                  <Link className="text-dark" to="/signup">
                    Sign Up
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Signin;