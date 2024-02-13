import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default function App() {
  return (
    <div className="container m-1">
      <PostForm />
      <PostList />
    </div>
  );
}
