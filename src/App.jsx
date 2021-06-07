import Navbar from './layouts/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Footer from './layouts/Footer/Footer';

import 'bootstrap';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
