import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { BackTop } from 'antd';
import { UpCircleTwoTone } from '@ant-design/icons'
import CoreValue from "./components/CoreValue";
import Footer from "./components/Footer";
import Header from './components/Header';
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import './scss/index.scss'
import DetailProduct from "./pages/DetailProduct";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import ProductByCategory from "./pages/ProductByCategory";
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout";

function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/dien-thoai-di-dong">
          <ProductByCategory />
        </Route>
        <Route exact path="/dien-thoai-di-dong/:slug">
          <DetailProduct />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route path="/*">
          <PageNotFound />
        </Route>
      </Switch>
      <CoreValue />
      <Footer />
      <BackTop>
        <UpCircleTwoTone style={{ fontSize: "3.5rem" }} />
      </BackTop>
    </Router>
  );
}

export default App;
