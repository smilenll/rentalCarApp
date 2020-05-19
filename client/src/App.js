import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/navbar';
import Dashboard from './components/dashboard/dashboard';
import Cars from './components/cars/cars';
import Rent from './components/rent/rent';
import store from './redux/store';
import Amortization from './components/amortization/amortization';
import Footer from './components/footer/footer';

function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" component={Dashboard} exact />
              <Route path="/cars" component={Cars} exact />
              <Route path="/rent/:carid" component={Rent} />
              <Route path="/amortization" component={Amortization} />
              <Route render={() => (<h1> 404</h1>)} />
            </Switch>
            <Footer />
          </div>
        </Provider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
