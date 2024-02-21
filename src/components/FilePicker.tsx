import { InputHTMLAttributes } from "react";
import styles from "./FilePicker.module.css";

export default function FilePicker(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      className={styles.filePicker}
      type="file"
      accept="image/*"
      multiple
      {...props}
    />
  );
}
