import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from "../utils/axiosWithAuth";
import {useParams} from "react-router-dom"
import NewPost from "../components/NewPost"


const AddPost = () => {
  const [posts, setPosts] = useState([])
  const {id} = useParams()


  useEffect(() => {
   const getData = () => {
    const token = window.localStorage.getItem("token");
    axiosWithAuth()
      .get("/story")
      .then(response => {
        console.log(response, "stories");
        setPosts(response.data);
      })
      .catch(err => console.log(err));
  };
  getData();
}, [setPosts]);

const addPost = newPost => {
  axiosWithAuth()
    .post(`/story/${id}/story`, newPost)
    .then(res => {
      console.log(res, "new post")
      window.location.reload();
      setPosts([
        ...posts,
        newPost
      ])
    })
}

const posting = e => {
  e.preventDefault();
  addPost(newStory)
}

const [newStory, setNewStory] = useState({
  title: "", 
  date: "", 
  location: "", 
  description: "", 
  image_url: "" })

const inputChange = e => {
  setNewStory({
    ...newStory,
    [e.target.name]: e.target.value
 })
}




return (
  <div>      
     <h4>ADD POST:</h4>
     <br></br>
     <br></br>
     <form onSubmit={posting}>
       <label>
         <input
           name="title"
           onChange={inputChange}
           type="text"
           placeholder="Title"
         />
       </label>
       <br></br>
       <br></br>
       <br></br>
       <label>
         <input
           name="date"
           onChange={inputChange}
           type="text"
           placeholder="Date"
         />
       </label>
       <br></br>
       <br></br>
        <br></br>
       <label>
         <input
           name="location"
           onChange={inputChange}
           type="text"
           placeholder="Location"
         />
       </label>
       <br></br>
       <br></br>
        <br></br>
       <label>
         <input
           name="description"
           onChange={inputChange}
           type="text"
           placeholder="Post"
         />
       </label>
       <br></br>
       <br></br>
       <br></br>
        <label>
         <input
           name="image_url"
           onChange={inputChange}
           type="text"
           placeholder="Image"
         />
       </label>
       <br></br>
        <br></br>
       <br></br>
       <button>Add Post</button>
       <br></br>
       <br></br>
      </form>
      <br></br>
      <br></br>
      <div>
          {posts.map(post => (
            <NewPost key={post.id} post={post}/>
          ))
          }
      </div>
      </div>
    )
}
export default AddPost;
