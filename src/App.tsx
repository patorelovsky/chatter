import NewPostForm from "./components/NewPostForm";
import PostList from "./components/PostList";

export default function App() {
  return (
    <div className="container m-1">
      <NewPostForm />
      <PostList />
    </div>
  );
}
