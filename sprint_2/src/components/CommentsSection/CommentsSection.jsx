import React from 'react';
import './CommentsSection.scss';
import UserPhoto from '../../assets/images/Mohan-muruge.jpg';
import Comments from '../Comments/Comments';

export default function CommentsSection({currentVideoId, commentsArray}) {
  // -> currentVideoId = Video ID of current video on the page
  // ----->currentVideoId to be used in future sprint
  // -> commentsArray = Array of comment objects for current video on the page
  
  if (!commentsArray) {
    return (
      <p>Loading comments...</p>
    )
  } else {
    let numberOfComments = commentsArray.length;
    return (
      <div>
        <section className="form-section">
          <h4 className="form-section__comment"><span className="form-section__comment-count">{numberOfComments}</span> Comments</h4>
          <div className="form-section__block">
            <div className="form-section__block-wrapper">
              <img className="form-section__block-wrapper-img" src={UserPhoto} alt="User"/>
            </div>
            <form className="form-section__block-form" id="commentForm">
            
              <div className="form-section__block-form-section">
                <label className="form-section__block-form-section-label" htmlFor="userComment">Join the conversation</label>
                <textarea
                  className="form-section__block-form-section-input"
                  type="text"
                  name="userComment"
                  id="userComment"
                  rows="3"
                  placeholder="Add a new comment">
                </textarea>
              </div>
  
              <button className="form-section__block-form-button" type="button">Comment</button>
            </form>
          </div>
        </section>
  
        <section>
          {/*
            Comments Component
            -> commentsArray = Array of comment objects
          */}
          <Comments commentsArray={commentsArray}/>
        </section>
      </div>
    )
  }
}