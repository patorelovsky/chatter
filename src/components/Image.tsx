import { useRef } from "react";
import type { Image } from "../types";
import styles from "./Image.module.css";

type Props = { image: Image };

export default function Image({ image }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleImageClick() {
    dialogRef.current?.showModal();
  }

  function handleDialogClick() {
    dialogRef.current?.close();
  }

  return (
    <div>
      <img
        className="h-20 w-auto object-contain"
        src={image.url}
        onClick={handleImageClick}
      />
      <dialog
        ref={dialogRef}
        className={styles.imageDialog}
        onClick={handleDialogClick}
      >
        <img className="max-h-96 object-contain" src={image.url} />
      </dialog>
    </div>
  );
}
