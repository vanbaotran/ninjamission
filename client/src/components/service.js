import axios from 'axios';
 
const service = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});
export default service;

function login(email, password) {
  return service.post('/users/login', {email, password}).then(response => response.data)
}
export {login}
 

function signup(name, email, password, profileType) {
  return service.post('/users/signup', {name, email, password, profileType}).then(response => response.data)
}
export {signup}
 
function editProfile(user){
  return service.patch('/users',{...user}).then(response => response.data)
}
export {editProfile}

function loggedIn(){
  return service.get('/users/loggedin').then(response => response.data)
}
export {loggedIn}

function logout(){
  return service.post('/users/logout').then(response => response.data)
}
export {logout}

function getUserData(id){
  return service.get(`/users/${id}`).then(response => response.data)
}
export {getUserData}

function getPostData(id){
  return service.get(`/posts/${id}`).then(response => response.data)
}
export {getPostData}

// function getOfferList(recruiterId){
//   return service.get(`/posts/recruiter/${recruiterId}`).then(response => response.data)
// }
// export {getOfferList}

function dataPostToStatePost(id) {
  return service.get(`/posts/${id}`).then(response => {
    let {
      offerName,
      companyLogo,
      companyBio,
      companyName,
      description,
      position,
      contract,
      experienceLevel,
      codeLanguage,
      remote,
      funFact,
      website,
    } = response.data;
    return {
      offerName,
      companyLogo,
      companyBio,
      companyName,
      description,
      position,
      contract,
      experienceLevel,
      codeLanguage,
      remote,
      funFact,
      website,
    };
  })
}
export {dataPostToStatePost}
//// UPLOAD
const errorHandler = err => {
  // console.error(err);
  throw err;
};

/* Process to do in form to upload file on cloudinary by the api*/
/*
handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    uploadFile(uploadData)
      .then(response => {
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      });
*/
function uploadFile(uploadData) { /// FormData key of the file must be imageUrl and response data key is secure_url
  return service
      .post('/upload', uploadData)
      .then(res => res.data)
      .catch(errorHandler);
}
export { uploadFile };
////////////////////////////////////////////////