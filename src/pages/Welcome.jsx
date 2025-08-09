import './Welcome.css'
import Footer from '../components/Footer'
export default function Welcome() {
    return (
        <div>
            <section className="home" id="home">
                <div className="video-container">
                    <video autoPlay
                        loop
                        muted
                        playsInline>
                        <source src="/vid-1.mov" type="video/mp4" />
                    </video>
                </div>
            </section>
            <Footer/>
        </div>
    )
}
