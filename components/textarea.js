import React from "react";
import styles from "./Textarea.module.css";

function Textarea({
  placeholder,
  value,
  onChange,
  rows = 1,
  label,
  description,
}) {
  return (
    <div>
      <label className={styles.label}>{label}</label>
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default Textarea;
