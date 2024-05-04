import { useEffect, useState } from "react"
import { Post } from "../types";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const url = "/api/v1/posts";
      try {
        const res = await fetch(url);
        if (res.ok) {
          const newPosts = await res.json();
          setPosts(newPosts);
        }
      } catch (e) {
        if (e instanceof Error) console.log(e);
        else throw new Error("An unexpected error occurred");
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="posts">
      { posts.length > 0 ?
        posts.map(post => {
          return <div key={post.id} className="post">
              <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
              <p>{post.content}</p>
            </div>;
        })
        : <p>No post yet!</p>
      }
    </div>
  );
};

export default Posts;