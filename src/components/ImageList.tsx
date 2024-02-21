import { useGetImagesQuery } from "../redux";
import type { Image as ImageType } from "../types";
import Image from "./Image/Image";

type Props = Pick<ImageType, "parentId" | "parentType">;

export default function ImageList({ parentId, parentType }: Props) {
  const { isFetching, isError, data } = useGetImagesQuery({
    parentId,
    parentType,
    _page: 1,
    _per_page: 10,
  });

  function getContent() {
    if (isFetching) {
      return <div>Loading images...</div>;
    } else if (isError) {
      return <div>Error loading images.</div>;
    } else {
      return data?.map((image) => <Image key={image.id} image={image} />);
    }
  }

  return <div className="container flex space-x-2">{getContent()}</div>;
}
