import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useCheckoutContext } from './hooks/useCheckoutContext';
import {Helmet} from "react-helmet";


import './App.css';

// pages and compnents

import Shop from './pages/shop/Shop';
import Home from './pages/home/Home';
import AdminPage from './pages/admin/Admin';
import Template from './pages/template/Template';
import Navbar from './components/Navbar';
import Login from './pages/login/Login';
import Checkout from './pages/checkout/Checkout';
import Footer from './components/Footer';
import Success from './pages/success/Success';
import Faq from './pages/faq/Faq';
import AboutUs from './pages/aboutUs/AboutUs';

//styles

import "react-multi-carousel/lib/styles.css"

function App() {

  const { user, authIsReady } = useAuthContext()
  const { items } = useCheckoutContext()
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Ryans Meats</title>
        <meta name="description" content="Ryans Meats"/>
      </Helmet>

      {authIsReady && (
        <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route >

          <Route path="/shop">
            <Shop />
          </Route >

          <Route path="/faq">
            <Faq/>
          </Route>

          <Route path="/aboutus">
            <AboutUs/>
          </Route>

          <Route path="/items/:id">
            <Template />
          </Route >

          <Route path="/checkout">
            {!items && <Redirect to="/"/>}
            {items && <Checkout />}
          </Route >

          <Route path="/login">
            {!user && <Login />}
            {user && <Redirect to='/admin'/>}
          </Route >

          <Route path="/admin">
            {user && <AdminPage />}
            {!user && <Redirect to='/'/>}
          </Route >

          <Route path="/success">
            <Success/>
          </Route>

          <Route path="/cancel">
            <Redirect to='/' />
          </Route>

          <Route path="/">
            <Redirect to='/'/>
          </Route>
          



        </Switch>
        <Footer />
        </BrowserRouter>
      )}

    </div>
  );
}

export default App;
