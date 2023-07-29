import logo from "./logo.svg";
import "./App.css";

import { ColorScheme } from "./pages/Color";
import LoginForm from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Layout} /> */}
        <Route exact path="/login" component={LoginForm} />

        <Route path="/" component={ColorScheme} />
      </Switch>
    </Router>
  );
}

export default App;
