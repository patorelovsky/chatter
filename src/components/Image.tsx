import { Image } from "../types";

type Props = { image: Image };

export default function Image({ image }: Props) {
  return (
    <div>
      <img src={image.url} />
    </div>
  );
}
