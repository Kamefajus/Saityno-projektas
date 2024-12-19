import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Modal from './Components/Modal';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Pages/Login';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:5133/api',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
    }
});

const App = () => {
    const [movies, setMovies] = useState([]);
    const [expandedMovieId, setExpandedMovieId] = useState(null);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [expandedCommentId, setCommentPostId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [posts, setPosts] = useState({});
    const [comments, setComments] = useState({});

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('accessToken') !== null;

    const movieTitleRef = useRef(null);
    const movieDescriptionRef = useRef(null);
    const postTitleRef = useRef(null);
    const postBodyRef = useRef(null);
    const commentContentRef = useRef(null);

    // Extract userId from the token
    const userID = isLoggedIn ? jwtDecode(localStorage.getItem('accessToken')).sub : null;

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const response = await axiosInstance.get('/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        if (isLoggedIn) {
            loadMovies();
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <Login />;
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const MovieList = () => {
        const loadPosts = async (movieId) => {
            try {
                const response = await axiosInstance.get(`/movies/${movieId}/posts`);
                setPosts((prev) => ({ ...prev, [movieId]: response.data }));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const loadComments = async (movieId, postId) => {
            try {
                const response = await axiosInstance.get(`/movies/${movieId}/posts/${postId}/comments`);
                setComments((prev) => ({
                    ...prev,
                    [postId]: response.data,
                }));
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        const handleCreateMovie = async (e) => {
            e.preventDefault();
            try {
                const newMovieData = {
                    title: movieTitleRef.current.value,
                    description: movieDescriptionRef.current.value,
                    userId: userID, 
                };
                const response = await axiosInstance.post('/movies', newMovieData);
                setMovies((prev) => [...prev, response.data]);
                movieTitleRef.current.value = '';
                movieDescriptionRef.current.value = '';
                setModalVisible(false); // Close modal after submitting
            } catch (error) {
                console.error('Error creating movie:', error);
            }
        };

        const handleEditMovie = async (movieId, e) => {
          e.preventDefault();
      
          const updatedMovieData = {
              title: movieTitleRef.current.value,
              description: movieDescriptionRef.current.value,
          };
      
          try {
              const response = await axiosInstance.put(`/movies/${movieId}`, updatedMovieData);
              setMovies((prev) =>
                  prev.map((movie) => (movie.id === movieId ? response.data : movie))
              );
              setExpandedMovieId(null); // Close edit mode
          } catch (error) {
              console.error('Error editing movie:', error);
          }
      };

        const handleDeleteMovie = async (movieId) => {
          try {
              await axiosInstance.delete(`/movies/${movieId}`);
              setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
          } catch (error) {
              console.error('Error deleting movie:', error);
          }
      };

        const handleCreatePost = async (movieId, e) => {
            e.preventDefault();

            const newPostData = {
                title: postTitleRef.current.value,
                body: postBodyRef.current.value,
                userId: userID,
            };

            try {
                const response = await axiosInstance.post(`/movies/${movieId}/posts`, newPostData);
                setPosts((prev) => ({
                    ...prev,
                    [movieId]: [...(prev[movieId] || []), response.data],
                }));

                postTitleRef.current.value = '';
                postBodyRef.current.value = '';
            } catch (error) {
                console.error('Error creating post:', error);
            }
        };

        const handleEditPost = async (movieId, postId, e) => {
          e.preventDefault();
      
          const updatedPostData = {
              title: postTitleRef.current.value,
              body: postBodyRef.current.value,
          };
      
          try {
              const response = await axiosInstance.put(`/movies/${movieId}/posts/${postId}`, updatedPostData);
              setPosts((prev) => ({
                  ...prev,
                  [movieId]: prev[movieId].map((post) =>
                      post.id === postId ? response.data : post
                  ),
              }));
          } catch (error) {
              console.error('Error editing post:', error);
          }
      };

        const handleDeletePost = async (movieId, postId) => {
          try {
              await axiosInstance.delete(`/movies/${movieId}/posts/${postId}`);
              setPosts((prev) => ({
                  ...prev,
                  [movieId]: prev[movieId].filter((post) => post.id !== postId),
              }));
          } catch (error) {
              console.error('Error deleting post:', error);
          }
      };


        const handleCreateComment = async (movieId, postId, e) => {
            e.preventDefault();
            try {
                const newCommentData = {
                    content: commentContentRef.current.value,
                    userId: userID,
                };
                const response = await axiosInstance.post(
                    `/movies/${movieId}/posts/${postId}/comments`,
                    newCommentData
                );
                setComments((prev) => ({
                    ...prev,
                    [postId]: [...(prev[postId] || []), response.data],
                }));
                commentContentRef.current.value = '';
            } catch (error) {
                console.error('Error creating comment:', error);
            }
        };

        const handleEditComment = async (movieId, postId, commentId, e) => {
          e.preventDefault();
      
          const updatedCommentData = {
              content: commentContentRef.current.value,
          };
      
          try {
              const response = await axiosInstance.put(
                  `/movies/${movieId}/posts/${postId}/comments/${commentId}`,
                  updatedCommentData
              );
              setComments((prev) => ({
                  ...prev,
                  [postId]: prev[postId].map((comment) =>
                      comment.id === commentId ? response.data : comment
                  ),
              }));
          } catch (error) {
              console.error('Error editing comment:', error);
          }
      };

        const handleDeleteComment = async (movieId, postId, commentId) => {
          try {
              await axiosInstance.delete(`/movies/${movieId}/posts/${postId}/comments/${commentId}`);
              setComments((prev) => ({
                  ...prev,
                  [postId]: prev[postId].filter((comment) => comment.id !== commentId),
              }));
          } catch (error) {
              console.error('Error deleting comment:', error);
          }
      };

      const handleEditClick = (movieId) => {
        setExpandedMovieId(movieId); 
    };
    const handlePostEditClick = (movieId, postId) => {
      setExpandedPostId(postId); 
    };
    const handleCommentEditClick = (movieId, postId,commentId) => {
      setCommentPostId(commentId); 
    };


        return (
            <div className="App">
                <Header />
                <div className="content">
                    <h1>Movies List</h1>

                    <button onClick={handleLogout} className="logout-btn">Logout</button>

                    {/* Button to open the modal */}
                    <button onClick={() => setModalVisible(true)} className="create-movie-btn">
                        Create New Movie
                    </button>

                    {/* Modal for creating a movie */}
                    {modalVisible && (
                        <Modal>
                            <h2>Create New Movie</h2>
                            <form onSubmit={handleCreateMovie} className="movie-form">
                                <input
                                    type="text"
                                    ref={movieTitleRef}
                                    placeholder="Movie Title"
                                    required
                                />
                                <textarea
                                    ref={movieDescriptionRef}
                                    placeholder="Movie Description"
                                    required
                                ></textarea>
                                <button type="submit">Add Movie</button>
                                <button
                                    type="button"
                                    onClick={() => setModalVisible(false)}
                                    className="close-modal-btn"
                                >
                                    Close
                                </button>
                            </form>
                        </Modal>
                    )}

                    {movies.length > 0 ? (
                        <div className="movie-list">
                            {movies.map((movie) => (
                                <div className="movie-item" key={movie.id}>
                                    <h2>{movie.title}</h2>
                                    <p>{movie.description}</p>
                                    <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
                                    <button onClick={() => handleEditClick(movie.id)}>Edit</button>
                                    {expandedMovieId === movie.id && (
                                    <form onSubmit={(e) => handleEditMovie(movie.id, e)} className="edit-movie-form">
                                        <input
                                            type="text"
                                            ref={movieTitleRef}
                                            defaultValue={movie.title}
                                            required
                                        />
                                        <textarea
                                            ref={movieDescriptionRef}
                                            defaultValue={movie.description}
                                            required
                                        ></textarea>
                                        <button type="submit">Save Changes</button>
                                        <button type="button" onClick={() => setExpandedMovieId(null)}>
                                            Cancel
                                        </button>
                                    </form>
                                )}
                                    <button
                                        onClick={() => {
                                            setExpandedMovieId((prev) =>
                                                prev === movie.id ? null : movie.id
                                            );
                                            loadPosts(movie.id);
                                        }}
                                    >
                                        {expandedMovieId === movie.id ? 'Hide Details' : 'Show Posts'}
                                    </button>
                                    {expandedMovieId === movie.id && posts[movie.id] && (
                                        <div className="posts">
                                            <h3>Posts:</h3>
                                            <form onSubmit={(e) => handleCreatePost(movie.id, e)}>
                                                <input
                                                    type="text"
                                                    ref={postTitleRef}
                                                    placeholder="Post Title"
                                                />
                                                <textarea
                                                    ref={postBodyRef}
                                                    placeholder="Post Body"
                                                ></textarea>
                                                <button type="submit">Add Post</button>
                                            </form>
                                            {posts[movie.id].length > 0 ? (
                                                posts[movie.id].map((post) => (
                                                    <div className="post-item" key={post.id}>
                                                        <h4>{post.title}</h4>
                                                        <p>{post.body}</p>
                                                        <button onClick={() => handleDeletePost(movie.id, post.id)}>Delete Post</button>
                                                        <button onClick={() => handlePostEditClick(movie.id, post.id)}>Edit Post</button>
    {expandedPostId === post.id && (
      <form onSubmit={(e) => handleEditPost(movie.id, post.id, e)} className="edit-post-form">
          <input
              type="text"
              ref={postTitleRef}
              defaultValue={post.title}
              required
          />
          <textarea
              ref={postBodyRef}
              defaultValue={post.body}
              required
          ></textarea>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setExpandedPostId(null)}>
              Cancel
          </button>
      </form>
  )}

                                                        <button
                                                            onClick={() => loadComments(movie.id, post.id)}
                                                        >
                                                            Show Comments
                                                        </button>
                                                        {comments[post.id] && (
    <div className="comments">
        <h5>Comments:</h5>
        <form
            onSubmit={(e) => handleCreateComment(movie.id, post.id, e)}
        >
            <input
                type="text"
                ref={commentContentRef}
                placeholder="Comment Content"
            />
            <button type="submit">Add Comment</button>
        </form>
        {comments[post.id].length > 0 ? (
            comments[post.id].map((comment) => (
                <div key={comment.id} className="comment-item">
                    <p>{comment.content}</p>
                    <button
                        onClick={() =>
                            handleDeleteComment(movie.id, post.id, comment.id)
                            
                        }
                    >
                        Delete Comment
                    </button>
                    <button
                        onClick={() =>
                          handleCommentEditClick(movie.id, post.id, comment.id)
                        }
                    >
                        Edit Comment
                    </button>
                    
                    {expandedCommentId === comment.id && (
  <form onSubmit={(e) => handleEditComment(movie.id, post.id, comment.id, e)} className="edit-comment-form">
    <input
      type="text"
      ref={commentContentRef}
      defaultValue={comment.content}
      required
    />
    <button type="submit">Save Changes</button>
    <button type="button" onClick={() => setCommentPostId(null)}>
      Cancel
    </button>
  </form>
)}
                </div>
                
            ))
        ) : (
            <p>No comments available.</p>
        )}
    </div>
)}
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No posts available.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading movies...</p>
                    )}
                </div>
                <Footer />
            </div>
        );
    };

    return (
        <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default App;
