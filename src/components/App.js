import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import { fetchPosts } from "../actions/posts";
import { PostsList, Navbar } from "./";

const Login = () => <div>Login</div>;
const Signup = () => <div>Sign up</div>;
const Home = () => <div>Home</div>;


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

           <ul>
             <li>
               <Link to="/">Home</Link>
             </li>
             <li>
               <Link to="/login">Login</Link>
             </li>
             <li>
               <Link to="/signup">Signup</Link>
             </li>
           </ul>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup} />
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
