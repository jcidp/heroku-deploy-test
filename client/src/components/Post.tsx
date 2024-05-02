import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { type Post } from "../types";

const Post = () => {
  const {id} = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    async function getPost() {
      try {
        const url = `posts/${id}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setPost(json);
      } catch (e) {
        if (e instanceof Error) console.log(e);
        else throw new Error("Unknown network error");
      }
    }
    getPost();
  }, [id]);

  if (!post) return <h1>This post doesn't exist</h1>;

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/">All posts</Link>
    </>
  );
}

export default Post;