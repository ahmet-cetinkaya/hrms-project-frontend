import "bootstrap";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Footer from "./layouts/Footer/Footer";
import Home from "./pages/Home/Home";
import JobAdvertsAdd from "./pages/JobAdverts/Add/JobAdvertsAdd";
import JobAdvertsVerify from "./pages/JobAdverts/Verify/JobAdvertsVerify";
import Navbar from "./layouts/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div id='App' className='d-flex flex-column'>
      <Router>
        <Navbar />
        <main className='flex-auto'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/jobadverts/add' component={JobAdvertsAdd} />
            <Route
              exact
              path='/jobadverts/verify'
              component={JobAdvertsVerify}
            />
          </Switch>
        </main>
        <Footer />
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  );
}

export default App;
