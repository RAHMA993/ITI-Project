import { IoPerson } from 'react-icons/io5';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShopify } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaSignOutAlt } from "react-icons/fa";

export default function Nav({ cart = [], currentUser, setCurrentUser, setCart }) {
    const navigate = useNavigate();

    const handleCartClick = (e) => {
        if (!currentUser) {
            e.preventDefault();
            navigate('/signin');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        if (currentUser) {
            localStorage.removeItem(`cart_${currentUser.email}`);
        }
        setCurrentUser(null);
        setCart([]); // Clear cart state on logout
        navigate('/');
    };

    return (
        <div>
            <nav style={{ backgroundColor: '#efc8ddff', color: 'black' }} className="nav fixed-top shadow-sm p-2 d-flex justify-content-between align-items-center px-5 mb-5">
                <div className='d-flex align-items-center'>
                    <FaShopify className=' fs-4' />
                    <h2>Oura Store</h2>
                </div>

                <div className="d-flex fs-4 gap-4 align-items-center ">
                    <NavLink to="/" className= {({ isActive}) => isActive ? "text-danger":""} style={{ color: 'black', textDecoration: 'none'}}>
                        Home
                    </NavLink>
                    <NavLink  to="/welcome" className= {({ isActive}) => isActive ? "text-danger":""} style={{ color: 'black', textDecoration: 'none' }}>
                        About
                    </NavLink>
                    <NavLink  to="/welcome" className= {({ isActive}) => isActive ? "text-danger":""} style={{ color: 'black', textDecoration: 'none' }}>
                        Contact
                    </NavLink>
                </div>

                <div className="d-flex align-items-center gap-3">
                    {currentUser ? (
                        <>
                            <span className="fs-5">Hello, {currentUser.username}</span>
                            <button className="btn btn-outline-dark btn-sm" onClick={handleLogout}>
                                <FaSignOutAlt className="me-1" />
                                    Logout
                            </button>
                        </>
                        ) : (
                            <Link to="/signin" className="text-decoration-none">
                                <IoPerson className='fs-2' style={{ color: 'black' }} />
                            </Link>
                        )}

                    <Link to="/cart" className="position-relative" >
                        <TiShoppingCart className="fs-2" style={{ color: 'black' }} />
                        {cart.length > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
        </div>
    )
}
