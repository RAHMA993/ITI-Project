import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <section className="footer">
            <div className="box-container">
                <div className="box">
                    <h3>about us</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam illum sunt quae dolores atque facere perferendis nobis expedita odio eligendi.</p>                    </div>
                <div className="box">
                    <h3>branch</h3>
                    <Link to="/welcome">egypt</Link>
                    <Link to="/welcome">london</Link>
                    <Link to="/welcome">korea</Link>
                    <Link to="/welcome">japan</Link>
                </div>
                <div className="box">
                    <h3>quick links</h3>
                    <Link to="/home">home</Link>
                    <Link to="/welcome">services</Link>
                    <Link to="/welcome">contact</Link>
                </div>
                <div className="box">
                    <h3>follow us</h3>
                    <Link to="/welcome">facebook</Link>
                    <Link to="/welcome">instagram</Link>
                    <Link to="/welcome">twitter</Link>
                    <Link to="/welcome">linkedin</Link>
                </div>
            </div>
                {/* <h1 className="created">created by <span>Amira elhosary</span></h1> */}
        </section>
    ) 
}
