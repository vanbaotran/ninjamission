import React, { Component } from "react";
import service, { uploadFile } from "../service";
import SelectInput from "../inputs/SelectInput";
import TextInput from "../inputs/TextInput";
import { dataPostToStatePost, editProfile } from "../service";
const LanguageOptions = [
  "PHP",
  "JS",
  "Python",
  "Ruby",
  "HTML",
  "CSS",
  "C++",
  "C",
  "Rust",
];
const ContractOptions = ["Internship", "Freelance", "Permanent", "Temporary"];
const LevelOptions = ["Warrior", "Ninja", "Samurai", "Sensei"];
export class PostForm extends Component {
  state = {
    offerName: "",
    companyLogo: "",
    companyBio: "",
    companyName: "",
    description: "", /// verif 500 char
    position: "",
    contract: "", //  enum: ["Internship", "Freelance", "Permanent", "Temporary"],
    experienceLevel: "", // enum: ["Warrior", "Ninja", "Samurai", "Sensei"],
    codeLanguage: [], // voir si enum et ou vérification bonne donnée
    location: { city: [], country: [] },
    remote: false,
    funFact: "", //maxlength: 250,
    website: "",

    errorMessage: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCheckbox = (e) => {
    this.setState({
      [e.target.name]: !this.state.remote,
    });
  };
  handleLogo = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    uploadFile(uploadData)
      .then((response) => {
        this.setState({ companyLogo: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };
  handleChangeMultiple = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { contract, experienceLevel, codeLanguage } = this.state;
    if (!contract || !experienceLevel || codeLanguage.length === 0) {
      this.setState({
        errorMessage: "Contract, level and code languages are required!",
      });
      setTimeout(() => this.setState({ errorMessage: false }), 3000);
    } else {
      if (this.props.match.params.id === "new") {
        service
          .post("/posts", { ...this.state })
          .then((response) => {
            // console.log("in submi", response)
            this.props.updateCurrentPost(response.data.newPost._id);
            editProfile({ currentPostId: response.data.newPost._id }).then(
              (response) => {
                console.log("CHANGING POST ID", response);
                this.props.updateUser(response);
              }
            );
            this.props.history.push("/");
          })
          .catch((err) => console.log(err));
      } else {
        service
          .patch(`/posts/${this.props.match.params.id}`, { ...this.state })
          .then((response) => {
            this.props.history.push("/");
          });
      }
      this.setState({
        offerName: "",
        companyLogo: "",
        companyBio: "",
        companyName: "",
        description: "", /// verif 500 char
        position: "",
        contract: "", //  enum: ["Internship", "Freelance", "Permanent", "Temporary"],
        experienceLevel: "", // enum: ["Warrior", "Ninja", "Samurai", "Sensei"],
        codeLanguage: [], // voir si enum et ou vérification bonne donnée
        location: { city: [], country: [] },
        remote: false,
        funFact: "", //maxlength: 250,
        website: "",
      });
    }
  };
  componentDidMount = () => {
    if (!(this.props.match.params.id === "new")) {
      dataPostToStatePost(this.props.match.params.id)
        .then((data) => {
          this.setState({ ...data });
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    return (
      <div className="post-form-main">
        {this.state.errorMessage && (
          <div className="text-red">
            <h1>{this.state.errorMessage}</h1>
          </div>
        )}
        <h2>
          {this.props.match.params.id === "new"
            ? "ADD A NEW OFFER"
            : "EDIT THE OFFER"}
        </h2>
        <form className="flex-column form-all-page" onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            <img
              src={this.state.companyLogo || "/images/temple.png"}
              alt="logo"
            />
            <input
              type="file"
              name="companyLogo"
              accept=".png,.jpg,.jpeg"
              onChange={this.handleLogo}
            />
          </label>

          <TextInput
            label="Name"
            name="offerName"
            value={this.state.offerName}
            change={this.handleChange}
          />
          <TextInput
            label="Position"
            name="position"
            value={this.state.position}
            change={this.handleChange}
          />
          <SelectInput
            label="Exp Level"
            name="experienceLevel"
            value={this.state.experienceLevel}
            change={this.handleChange}
            options={LevelOptions}
            multiple={false}
          />
          <SelectInput
            label="Contract"
            name="contract"
            value={this.state.contract}
            change={this.handleChange}
            options={ContractOptions}
            multiple={false}
          />

          <label>
            Remote
            <input
              name="remote"
              type="checkbox"
              checked={this.state.remote}
              onChange={this.handleCheckbox}
            />
          </label>
          <SelectInput
            label="Languages"
            name="codeLanguage"
            value={[...this.state.codeLanguage]}
            change={this.handleChangeMultiple}
            options={LanguageOptions}
            multiple={true}
          />
          <TextInput
            label="Company Bio"
            name="companyBio"
            value={this.state.companyBio}
            change={this.handleChange}
            area={true}
            rows={5}
            cols={20}
          />
          <TextInput
            label="Description"
            name="description"
            value={this.state.description}
            change={this.handleChange}
            area={true}
            rows={10}
            cols={20}
          />
          <TextInput
            label="Fun fact"
            name="funFact"
            value={this.state.funFact}
            change={this.handleChange}
            area={true}
            rows={3}
            cols={20}
          />
          <TextInput
            label="Website"
            name="website"
            value={this.state.website}
            change={this.handleChange}
          />
          <button>
            {this.props.match.params.id === "new"
              ? "Add new post"
              : "Edit the post"}
          </button>
        </form>
      </div>
    );
  }
}

export default PostForm;
