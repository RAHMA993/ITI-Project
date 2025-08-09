import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './signin.css';
import img from '../assets/signin.jpg';

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Username must be at least 3 characters').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="all">
      <div className="login">
        <div className="r-section">
          <h2>Welcome Back!</h2>
          <br /><br />
          <div className="img">
            <img src={img} alt="Sign up" />
          </div>
        </div>
        <div className="l-section">
          <h2>SIGN UP</h2>
          <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setFieldError }) => {
              const users = JSON.parse(localStorage.getItem('users') || '[]');
              const emailExists = users.some((u) => u.email === values.email);
              if (emailExists) {
                setFieldError('email', 'Email already registered');
                return;
              }
              const newUser = {
                username: values.username,
                email: values.email,
                password: values.password,
              };
              users.push(newUser);
              localStorage.setItem('users', JSON.stringify(users));
              localStorage.setItem(`cart_${values.email}`, JSON.stringify([])); // Initialize empty cart
              navigate('/signin');
            }}
          >
            <Form>
              <div className="form-control">
                <Field type="text" name="username" required />
                <label>
                  <span style={{ transitionDelay: '0ms' }}>U</span>
                  <span style={{ transitionDelay: '50ms' }}>s</span>
                  <span style={{ transitionDelay: '100ms' }}>e</span>
                  <span style={{ transitionDelay: '150ms' }}>r</span>
                  <span style={{ transitionDelay: '200ms' }}>N</span>
                  <span style={{ transitionDelay: '250ms' }}>a</span>
                  <span style={{ transitionDelay: '300ms' }}>m</span>
                  <span style={{ transitionDelay: '350ms' }}>e</span>
                </label>
                <ErrorMessage name="username" component="div" className="error" />
              </div>
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
              <div className="form-control">
                <Field type="password" name="confirmPassword" required />
                <label>
                  <span style={{ transitionDelay: '0ms' }}>C</span>
                  <span style={{ transitionDelay: '50ms' }}>o</span>
                  <span style={{ transitionDelay: '100ms' }}>n</span>
                  <span style={{ transitionDelay: '150ms' }}>f</span>
                  <span style={{ transitionDelay: '200ms' }}>i</span>
                  <span style={{ transitionDelay: '250ms' }}>r</span>
                  <span style={{ transitionDelay: '300ms' }}>m</span>
                  <span style={{ transitionDelay: '350ms' }}> </span>
                  <span style={{ transitionDelay: '400ms' }}>P</span>
                  <span style={{ transitionDelay: '450ms' }}>a</span>
                  <span style={{ transitionDelay: '500ms' }}>s</span>
                  <span style={{ transitionDelay: '550ms' }}>s</span>
                  <span style={{ transitionDelay: '600ms' }}>w</span>
                  <span style={{ transitionDelay: '650ms' }}>o</span>
                  <span style={{ transitionDelay: '700ms' }}>r</span>
                  <span style={{ transitionDelay: '750ms' }}>d</span>
                </label>
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              <button type="submit">Sign Up</button>
              <p>
                Already have an account?{" "}
                <Link className="text-dark" to="/">
                  Sign In
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Signup;