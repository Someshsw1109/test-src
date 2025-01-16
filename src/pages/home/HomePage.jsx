import Category from "../../components/category/Category";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";

const HomePage = () => {
    return (
        <Layout>
            <Category/>
            <HomePageProductCard/>
            <Track/>
            <Testimonial/>
        </Layout>
    );
}

export default HomePage;