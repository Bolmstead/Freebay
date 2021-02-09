import { BrowserRouter } from 'react-router-dom';
import './App.css';
import PrimarySearchAppBar from './Components/Navigation/PrimarySearchAppBar.js'
import CategoriesBar from './Components/Navigation/CategoriesBar/CategoriesBar.js'
import TestAppBar from './Components/Navigation/CategoriesBar/Category.js'
import Routes from './Routes.js'
import Container from '@material-ui/core/Container';
import ProductsContext from "./Components/Common/ProductsContext.js";





function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <ProductsContext.Provider value={products}> */}

        <BrowserRouter>

        <Container>
        <PrimarySearchAppBar/>
        <CategoriesBar/>
        <Routes/>
        <Container>
        <hr/>
        </Container>
        </Container>
        </BrowserRouter>

        {/* </ProductsContext.Provider> */}

      </header>
    </div>
  );
}

export default App;
