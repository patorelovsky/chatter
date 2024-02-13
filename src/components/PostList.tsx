import { useFetchPostsQuery } from "../redux";
import Post from "./Post";

export default function PostList() {
  const { error, isFetching, data } = useFetchPostsQuery(1);

  const getContent = () => {
    if (isFetching) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error loading posts.</div>;
    } else {
      return data?.map((post) => <Post key={post.id} post={post} />);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <div>{getContent()}</div>
    </div>
  );
}
