import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./ShowBlogs.css"
import axios from 'axios';

const ShowBlogs = () => {
    const navigate = useNavigate()
    const [allPost, setallPost] = useState([]);
    const [like, setLike] = useState(0)

    const getPost = async () => {
      const token = localStorage.getItem('jwtoken')
      if(!token){
        navigate('/login')
      }
        const showPost = await axios.get("http://localhost:5000/api/getblogs");
        setallPost(showPost.data);
       
    };
    useEffect(() => {
        getPost();
  
      }, []);
    return (
        <>
      <div className="showPost_container">
        {allPost.map((element, index) => (
          <div key={element._id} className="show_post">
            <div className="user_post">
            <i className="fas fa-user"></i>
            <div className="user_dtl">
            <h5>{element.name}</h5>
            <h6>{element.department}</h6> 
            </div>
            </div>
            {element.files.map((file, index) => (
              <img
                src={`http://localhost:5000/${file.filePath}`}
                className="img"
                alt="img"
              />
            ))}
            <p>{element.description}</p>
            <div className="like">
            <button onClick={()=>setLike(like + 1)}><i className="fas fa-thumbs-up"></i> <span>{like}</span></button>
            </div>
         </div>
        ))}
      </div>
        </>
    )
}

export default ShowBlogs
