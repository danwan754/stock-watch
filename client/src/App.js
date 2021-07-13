import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import QuoteScreen from './screens/QuoteScreen';
import TopPickScreen from './screens/TopPickScreen';
import SignInScreen from './screens/SignInScreen';
import ListsScreen from './screens/ListsScreen';


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <div className="header-brand">
            <Link to="/">Stock-Watch</Link>
          </div>
          <div className="header-links">
            <Link to="/quote">Quote</Link>
            <Link to="/lists">Watch-Lists</Link>
            <Link to="/top">Top-Picks</Link>
            <Link to="/signin">Sign-In</Link>
          </div>
        </header>
        <main>
          <div className="main-container">
            <Route path="/" exact component={HomeScreen} />
            <Route path="/quote" component={QuoteScreen} />
            <Route path="/top" component={TopPickScreen} />
            <Route path="/lists" component={ListsScreen} />
            <Route path="/signin" component={SignInScreen} />
          </div>
        </main>
        <footer>
          Developed by Dan Wan.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
