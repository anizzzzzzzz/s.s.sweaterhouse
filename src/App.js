import React, {Component} from 'react';
import './App.css';
import IndexCorausel from "./component/home/IndexCarousel";
import CategoriesCard from "./component/home/CategoriesCard";
import NavigationBar from "./component/common/navbar/NavigationBar";

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavigationBar/>
          <IndexCorausel/>
          <CategoriesCard/>
     </div>
    );
  }
}

export default App;
