import React from 'react'
import "./comment.css"
const comment = (props) => {
    return (
        <>
            <div className="show_comment">
           <div className="cmt">
           <i class="fas fa-comment"></i> 
           <h5>{props.comment}</h5>
           </div>
              </div>
        </>
    )
}

export default comment
