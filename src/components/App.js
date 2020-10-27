import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

import { fetchPosts } from "../actions/posts";
import { Home, Navbar, Page404,Login } from "./";


const Signup = () => <div>Sign up</div>;

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          {/* <PostsList posts={posts} /> */}

          <Switch>
              
         
          <Route
            exact
            path="/"
            render={(props) => {
              return <Home {...props} posts={posts} />;
            }}
          />  
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
