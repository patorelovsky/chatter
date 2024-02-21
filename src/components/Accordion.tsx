import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

export default function Accordion({ children, title }: Props) {
  const [showComments, setShowComments] = useState(false);

  function handleHeadingClick() {
    setShowComments((oldVal) => !oldVal);
  }

  return (
    <div className="ml-2">
      <div
        className="flex cursor-pointer items-center"
        onClick={handleHeadingClick}
      >
        <p className="mr-2">{showComments ? "˅" : ">"}</p>
        <h2 className="font-medium text-sm">{title}</h2>
      </div>
      {showComments && children}
    </div>
  );
}
