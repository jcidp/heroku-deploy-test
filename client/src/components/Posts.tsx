import { useEffect, useState } from "react"
import { Post } from "../types";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const url = "/posts";
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
      { posts ?
        posts.map(post => {
          return <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>;
        })
        : <p>No post yet!</p>
      }
    </div>
  );
};

export default Posts;