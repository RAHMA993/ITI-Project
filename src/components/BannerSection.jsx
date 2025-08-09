import React from 'react';
import './BannerSection.css';
import { Link } from 'react-router-dom';

export default function BannerSection() {
    return (
        <div className=" bannerSection bg-dark text-white py-5">
            <div className="container">
                <div className="row justify-content-center align-items-center">

                    {/* First*/}
                    <div className="col-md-4 text-center mb-4 mb-md-0">
                        <h3 className="mb-3">Choose Your Taste</h3>
                        <div className="image-box  img-shadow" style={{ backgroundImage: "url('/banner1.jpg')" }} />
                    </div>

                    {/* Second*/}
                    <div className="col-md-4 position-relative text-center d-flex justify-content-center">
                        <div className="middle-image img-shadow" style={{ backgroundImage: "url('/banner2.jpg')" }}>
                            <div className="text-overlay text-white text-center">
                                <h4>Collection</h4>
                                <h3>BAGS</h3>
                                <Link to="/products" className="btn btn-outline-light mt-2">SHOP NOW</Link>
                            </div>
                        </div>
                    </div>

                    {/* Third*/}
                    <div className="col-md-4 text-center">
                        <div className="image-box img-shadow mb-3" style={{ backgroundImage: "url('/banner3.jpg')" }} />
                        <h4>New Arrivals waiting you</h4>
                    </div>

                </div>
            </div>
        </div>
    );
}
