import React, { Component } from "react";
import service from "../service.js";
import {Link} from 'react-router-dom'

class CandidateDetails extends Component {
  state = {
    name: this.props.currentUser?.name || "",
    email: this.props.currentUser?.email || "",
    birthday: this.props.currentUser?.birthday || "",
    bio: this.props.currentUser?.bio || "",
    avatar: this.props.currentUser?.avatar || "",
    title: this.props.currentUser?.title || "",
    codeLanguage: this.props.currentUser?.codeLanguage || "",
    funFact: this.props.currentUser?.funFact || "",
    level: this.props.currentUser?.level || "",
    usefulLinks: {
      linkedin: this.props.currentUser?.usefulLinks?.linkedin || "",
      github: this.props.currentUser?.usefulLinks?.github || "",
      portfolio: this.props.currentUser?.usefulLinks?.portfolio || "",
    },
    fromswipe: false,
  };
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.history.push("/login");
    } else {
      if (this.props.fromswipe) {
        service
          .get(`/users/${this.props.match.params.id}`)
          .then((data) => {
            console.log(data);
            this.setState({
              ...data.data,
              fromswipe: this.props.fromswipe || false,
            });
          })
          .catch((err) => console.log(err));
      } else {
        service
          .get(`/users/${this.props.currentUser._id}`)
          .then((data) => {
            console.log(data);
            this.setState({
              ...data.data,
              fromswipe: this.props.fromswipe || false,
            });
          })
          .catch((err) => console.log(err));
      }
    }
  }
  handleEdit = (e) => {
    // this.props.history.push(`/postForm/${this.props.match.params.id}`);
  };
  //update state.currentPostId if chosen
  updateCurrentPost = () => {
    // this.props.updateCurrentPost(this.props.match.params.id);
    // editProfile({currentPostId:this.props.match.params.id})
    // .then(response=>{
    //   console.log('CHANGING POST ID', response)
    //   this.props.updateUser(response)
    // })
    // .catch(err=>console.log(err))
  };
  back = () => {
    // this.props.history.push(`/swipeOffer/${this.props.match.params.id}`);
  };
  render() {
    return (
      <div>
        <div className="head-candidate-detail">
          <div className="head-avatar-candidate">
            <img
              src={this.state.avatar ? this.state.avatar : "/images/ninja.png"}
              alt="avatar"
            />
            <p>location</p>
          </div>
          <div className="head-name-candidate">
            <h1>{this.state.name}</h1>
            <img
              src={`/images/${
                this.state.level
                  ? `${this.state.level.toLowerCase()}.png`
                  : "ninja.png"
              }`}
              alt="level ico"
            />
          </div>
          {/* {this.props.fromswipe  || <button onClick={this.updateCurrentPost}>CHOOSE TO BE CURRENT POST</button>} */}
        </div>
        <div className="body-candidate-details">
          <div className="detail-level">
            <div>
              <h4>CODE LANGUAGES</h4>
              <p>
                {this.state.codeLanguage
                  ? this.state.codeLanguage.join(",")
                  : "none"}
              </p>
            </div>
            {/* <img
              src={`/images/${
                this.state.level
                  ? this.state.experienceLevel.toLowerCase()
                  : "ninja.png"
              }.png`}
              alt="logo level"
            /> */}
          </div>
          <div>
            <h4>BIO</h4>
            <p>{this.state.bio}</p>
          </div>
          {this.state.funFact && (
            <div className="fun-fact">
              <h4>FUN FACT</h4>
              <p>{this.state.funFact}</p>
            </div>
          )}

          <div className="link-candidate">
            <a href={this.state.website} rel="noreferrer" target="_blank">
              {this.state.website}
            </a>
          </div>
        </div>
      {(this.props.fromswipe &&  <Link to={`/swipeCandidate/${this.props.match.params.id}`}><button>GO BACK</button></Link>) || <Link to='/editCandidateform'><button>Edit my info</button></Link> } 
      </div>
    );
  }
}

export default CandidateDetails;
