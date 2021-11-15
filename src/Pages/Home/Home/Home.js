import React from "react";
import TopeBanner from "../TopBanner/TopeBanner";
import Header from "../../Shared/Header/Header";
import Services from "../Services/Services";
import ReviewSection from "../ReviewSection/ReviewSection";
import Footer from "../../Shared/Footer/Footer";
import Contact from "../Contact/Contact";
const Home = () => {
  return (
    <div>
      <Header></Header>
      <TopeBanner></TopeBanner>
      <Services></Services>
      <ReviewSection></ReviewSection>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
};

export default Home;
