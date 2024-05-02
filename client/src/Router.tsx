import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import NewPost from "./components/NewPost";
import Post from "./components/Post";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/posts/new",
      element: <NewPost />
    },
    {
      path: "/posts/:id",
      element: <Post />
    }
  ]);


  return <RouterProvider router={router} />;
};

export default Router;