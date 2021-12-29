import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "./BlogPost.css"
import Header from '../Header/Header'
const BlogPost = () => {
    const navigate = useNavigate()
    const aboutPage=()=>{
        const token = localStorage.getItem("jwtoken")
        if(!token){navigate('/')}
    }
    useEffect(() => {
        aboutPage()
    }, [])
    return (
        <>
        <Header/>
        <div className="blogPost_container">
            <h1>Blog Post....</h1>
        </div>
            
        </>
    )
}

export default BlogPost
