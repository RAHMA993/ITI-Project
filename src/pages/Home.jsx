import Categories from "../components/Categories";
import BannerSection from "../components/BannerSection";
import Footer from "../components/Footer";


function Home({ categories }) {
  return (
    <div>
      <BannerSection/>
      <Categories categories ={categories} />
      <Footer/>
    </div>  
  );
}

export default Home;