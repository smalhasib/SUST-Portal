import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FilterPost from "../FilterPost/FilterPost";
import Header from "../Header/Header";
import PinPost from "../PinPost/PinPost";
import ShowPost from "../Post/ShowPost";
import Post from "../Post/Post"
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate()
  const [click, setClick] = useState(false)
  const token = localStorage.getItem('jwtoken')
  const outHomepage =()=>{
    if(!token){
      navigate('/login')
    }else{
      navigate('/homepage')
    }
  }

  useEffect(() => {
    outHomepage()
  }, [])
  return (
    <>
      <Header />
      <div className="homepage">
        <FilterPost />
        <div className="create_btn">
                <button onClick={()=> setClick(!click)}>Create Post</button>
            </div>
          {click ? <Post/> : ""}
        <ShowPost/>
        <PinPost />
      </div>
    </>
  );
};

export default Homepage;
