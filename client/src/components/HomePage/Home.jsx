import React from 'react'
import Header from '../Header/Header'
import "./Home.css"

const Home = () => {
    return (
        <>
        <Header/>
            <div className="home">
                <div className="home_content">
                    <div className="content">
                      <h3>The way to get started is to quit talking and begin doing.</h3>
                      <h4> -Walt Disney</h4>
                    </div>
                    <div className="about">
                        <h1>What our site provides????</h1>
                        <div className="about_card">
                            <h3>Get daily updates of our versity.</h3>
                        </div>
                        <div className="about_card">
                            <h3>Write your blogs about our versity</h3>
                        </div>
                        <div className="about_card">
                            <h3>Get Resourses of different departments.</h3>
                        </div>
                    </div>
                </div>
            <div className="wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#3e065f" fillOpacity="0.85" d="M0,160L40,181.3C80,203,160,245,240,245.3C320,245,400,203,480,160C560,117,640,75,720,90.7C800,107,880,181,960,218.7C1040,256,1120,256,1200,240C1280,224,1360,192,1400,176L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            </div>
            </div>
        </>
    )
}

export default Home
