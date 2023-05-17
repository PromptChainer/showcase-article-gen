import React from "react";
import styles from "./Textarea.module.css";

function Textarea({
  placeholder,
  value,
  onChange,
  rows = 1,
  label,
  description,
  isKeywords = false,
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
      {isKeywords && value && (
        <div className={styles.keywords}>
          {value.split(",").map((keyword, i) => {
            return (
              <div key={i} className={styles.keyword}>
                {keyword}
              </div>
            );
          })}
        </div>
      )}
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default Textarea;
