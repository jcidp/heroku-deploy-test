import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Post } from "../types";

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "/api/v1/posts";
    if (!title || !content) return;
    const body = {
      title,
      content
    };
    async function createPost() {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(response.statusText);
        const newPost: Post = await response.json();
        navigate(`/posts/${newPost.id}`);
      } catch (e) {
        if (e instanceof Error) console.log(e);
        else throw new Error("Unexpected error");
      }
    }
    createPost();
  };

  return (
    <>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" id="title" value={title} onChange={e => handleChange(e, setTitle)} />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea name="content" id="content" cols={30} rows={10} value={content} onChange={e => handleChange(e, setContent)}></textarea>
        </div>
        <button>Create</button>
      </form>
    </>
  );
};

export default NewPost;
