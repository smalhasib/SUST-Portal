import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "./BlogPost.css"
import Header from '../Header/Header'
import ShowBlogs from './ShowBlogs'
import jwt_decode from "jwt-decode";

const BlogPost = () => {
    const navigate = useNavigate()
    const [multipleFiles, setMultipleFiles] = useState("");
    const [description, setdescription] = useState("");
    const [click, setClick] = useState(false)

    const MultipleFileChange = (e) => {
      setMultipleFiles(e.target.files);
    };
  
  //Uploading files....
    const UploadMultipleFiles = async () => {
     if(description.length>0 || multipleFiles.length>0){
      const formData = new FormData();
      const token = localStorage.getItem('jwtoken')
      var decoded = jwt_decode(token);
      formData.append("description", description);
      formData.append("name", decoded.name);
      formData.append("department", decoded.department);
      for (let i = 0; i < multipleFiles.length; i++) {
        formData.append("files", multipleFiles[i]);
      }
      await axios.post("http://localhost:5000/blog/post",formData);
     }else{
       alert("Please Write your blog..")
     }
     window.location.reload();
    
     useEffect(() => {
      const token = localStorage.getItem("jwtoken");
      if (!token) {
        navigate("/login");
        return;
      }
     }, [])

    };
    return (
        <>
        <Header/>
        <button className='post_btn' onClick={()=>setClick(!click)}><i className="fas fa-plus-circle"> <span>Create your blog</span></i></button>
        {
          click ?
          <div className="post_wrapper">
          <div className="input_field">
            <textarea
              type="text"
              placeholder="Write your blog...."
              className="input"
              onChange={(e) => setdescription(e.target.value)}
              cols=""
              rows="3"
            ></textarea>
          </div>
          <div className="file_input">
            <input
              type="file"
              className="file"
              onChange={(e) => MultipleFileChange(e)}
            />
          </div>
          <button
            type="button"
            onClick={() => UploadMultipleFiles()}
            className="btn"
          >
            Post
          </button>
      </div>: ""
        }
            <ShowBlogs/>
        </>
    )
}

export default BlogPost
