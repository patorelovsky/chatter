import { useGetPostsQuery } from "../redux";
import Divider from "./Divider";
import NewPostForm from "./NewPostForm";
import Post from "./Post";

export default function PostList() {
  const { isError, isFetching, data } = useGetPostsQuery({
    _page: 1,
    _per_page: 10,
  });

  function getContent() {
    if (isFetching) {
      return <div>Loading posts...</div>;
    } else if (isError) {
      return <div>Error loading posts.</div>;
    } else {
      return data?.map((post) => <Post key={post.id} post={post} />);
    }
  }

  return (
    <div>
      <h1 className="font-medium text-xl">Posts</h1>
      <NewPostForm />
      <Divider />
      <div>{getContent()}</div>
    </div>
  );
}
