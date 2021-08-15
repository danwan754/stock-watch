import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import QuoteScreen from './screens/QuoteScreen';
import TopPickScreen from './screens/TopPickScreen';
import SignInScreen from './screens/SignInScreen';
import ListsScreen from './screens/ListsScreen';
import RegisterScreen from './screens/RegisterScreen';
import NavBar from './components/NavBar';

function App() {

  return (
    <BrowserRouter>
        <div className="grid-container">
          <header>
            <div className="header-brand">
              <Link to="/">Stock-Watch</Link>
            </div>
            <NavBar />
          </header>
          <main>
            <div className="main-container">
              <Route path="/" exact component={HomeScreen} />
              <Route path="/quote" component={QuoteScreen} />
              <Route path="/top" component={TopPickScreen} />
              <Route path="/lists" component={ListsScreen} />
              <Route path="/login" component={SignInScreen} />
              <Route path="/register" component={RegisterScreen} />
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
