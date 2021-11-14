import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import Game from './Game'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/game'>
            <Game />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
