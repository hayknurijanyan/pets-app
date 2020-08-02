import React from 'react';
import photo from '../images/pets.jpg';
import Footer from './footer';



const Signin = () => {
    return ( 
      <div>
  <div className="container">

  <div className="row">
  <div className="col-sm-9 col-md-7 col-lg-5 mr-auto">
        <img src={photo} alt="Logo" width="550" height="600"/>
</div>

  <div className="col-sm-9 col-md-7 col-lg-5 ml-auto mt-5">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Sign In</h5>
            <form className="form-signin">
              <div className="form-label-group">
                <label for="inputEmail">Email Address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
              </div>

              <div className="form-label-group mt-3 mb-1" >
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
              </div>

              <div className="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                <label className="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit">Sign in</button>
              <hr className="my-4"/>
              <span className="m-2">Not a member?</span><a href="signup">Sign Up</a>
            </form>
          </div>
        </div>
      </div>
    </div>

    
  </div>
<Footer/>
</div>

     );
}
 
export default Signin;