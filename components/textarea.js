import React, { useRef, useState, useEffect } from "react";
import styles from "./Textarea.module.css";

function Textarea({
  placeholder,
  value,
  onChange,
  rows = 1,
  label,
  description,
  isKeywords = false,
  cols = 50,
}) {
  const textareaRef = useRef();

  const resizeTextarea = () => {
    const textarea = textareaRef?.current;
    const str = textarea.value;
    const cols = textarea.cols;

    let lineCount = 0;
    str.split("\n").forEach((line) => {
      lineCount += Math.ceil(line.length / cols);
    });

    textarea.rows = lineCount + 1;
  };

  useEffect(() => {
    const textarea = textareaRef?.current;
    textarea.addEventListener("input", resizeTextarea);
    resizeTextarea();

    return () => {
      textarea.removeEventListener("input", resizeTextarea);
    };
  }, []);

  return (
    <div>
      <label className={styles.label}>{label}</label>
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        ref={textareaRef}
        cols={cols}
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
