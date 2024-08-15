"use client";
import React from "react";
import styles from "./ProgressBar.module.css";

export interface ProgressBarProps {
  steps: number;
  filledProgress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  filledProgress,
}) => {
  const stepWidth = `calc((100% - ${(steps - 1) * 4}px) / ${steps})`;

  return (
    <div className={styles.progressContainer}>
      {Array.from({ length: steps }).map((_, index) => (
        <span
          key={index}
          className={`${styles.step} ${
            index < filledProgress && styles.filled
          }`}
          style={{ width: stepWidth }}
        />
      ))}
    </div>
  );
};
