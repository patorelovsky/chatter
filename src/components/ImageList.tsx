import { useGetImagesQuery } from "../redux";
import type { Image as ImageType } from "../types";
import Image from "./Image";

type Props = Partial<ImageType> & Pick<ImageType, "parentId" | "parentType">;

export default function ImageList({ parentId, parentType }: Props) {
  const { isFetching, isError, data } = useGetImagesQuery({
    parentId,
    parentType,
  });

  function getContent() {
    if (isFetching) {
      return <div>Loading...</div>;
    } else if (isError) {
      return <div>Error loading images.</div>;
    } else {
      return data?.map((image) => <Image key={image.id} image={image} />);
    }
  }

  return <div className="container flex space-x-2">{getContent()}</div>;
}
