import React, {Component} from 'react';
import './App.css';
import IndexCorausel from "./component/home/IndexCarousel";
import CategoriesCard from "./component/home/CategoriesCard";
import NavigationBar from "./component/common/navbar/NavigationBar";
import FeaturedProducts from "./component/home/FeaturedProducts";
import SubscriptionSection from "./component/home/SubscriptionSection";
import Footer from "./component/common/footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavigationBar/>
          <IndexCorausel/>
          <CategoriesCard/>
          <FeaturedProducts/>
          <SubscriptionSection/>
          <Footer/>
     </div>
    );
  }
}

export default App;
