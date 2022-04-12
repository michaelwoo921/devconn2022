import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { useParams, Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
  const post = useSelector((state) => state.post);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch]);
  return post.loading || post.post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem post={post.post} showActions={false} />
      <CommentForm postid={post.post._id} />
      <div className="comments">
        {post.post.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postid={post.post._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Post;
