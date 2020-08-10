import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
const Logout = () => {
  return ( 
    <Router>
      <Switch>
        <Redirect to='signin'/>
      </Switch>
    </Router>
   );
}
 
export default Logout;