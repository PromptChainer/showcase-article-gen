import React from "react";
import styles from "./Textarea.module.css";

function Textarea({
  placeholder,
  value,
  onChange,
  rows = 5,
  label,
  description,
}) {
  return (
    <div>
      <label className={styles.label} style={{ color: '#333' }}>{label}</label>
      <p className={styles.description}>{description}</p>
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    </div>
  );
}

export default Textarea;
