import React from 'react'
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import PostForm from './components/forms/PostForm';
import RecruiterForm from "./components/forms/RecruiterForm";
// import PostDetails from './components/details/PostDetails';
import {Switch, Route} from 'react-router-dom';
import CandidateForm from './components/forms/CandidateForm'
import {loggedIn} from './components/service';
import ProfilePage from './components/ProfilePage'
import NavBar from './components/NavBar';
import SwipJobPost from './components/SwipJobPost';
// import PostDetails from './components/details/PostDetails';

class App extends React.Component {
  state = {
    loggedInUser: null,
    currentPostId: null
  }
 fetchUser() {
    if (this.state.loggedInUser === null || this.state.loggedInUser === false){
      loggedIn()
        .then(response => {
          this.setState({loggedInUser: response})
        })
        .catch(err => {
          this.setState({loggedInUser: false}) 
        })
    } 
 }
  updateCurrentPostId = (id) => {
    this.setState({ currentPostId: id });
  }
  componentDidMount() {
    this.fetchUser()
  }
  componentDidUpdate(prevProps) {
    console.log(this.state.currentPostId);
  }
  updateLoggedInUser = (userObj) =>{
    this.setState({loggedInUser:userObj})
  }
  render(){
    return (
      <div className="App">
      <NavBar/>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/login'  render={()=><Login currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>}/>
          <Route path='/signup' render={()=><Signup currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>} />
          <Route path='/candidateform' render={()=><CandidateForm currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>} />
          {/* <Route path='/createpost' render={() => <PostForm {...this.props} updateCurrentPost={this.updateCurrentPost}/>}/> */}
          <Route path='/profilepage' render={()=><ProfilePage currentUser={this.state.loggedInUser}/>} />
          <Route path='/postform/:id' render={(props) => <PostForm {...props} updateCurrentPost={this.updateCurrentPostId}/>}/> 
          {/* <Route path='/intest/:id' render={(props) => <PostDetails {...props} currentUser={this.state.loggedInUser} />} /> */}
          <Route path='/recruiterform' render={(props) => <RecruiterForm {...props} currentUserId={this.state.loggedInUser ? this.state.loggedInUser._id : false} />} />
          <Route path='/intest' render={()=><SwipJobPost currentUser={this.state.loggedInUser}/>} />

        </Switch>
      </div> 
    );
  }
}

export default App;
