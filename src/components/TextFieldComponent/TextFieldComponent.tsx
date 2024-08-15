import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import WarningIcon from "../../assets/icons/WarningIcon";
import styles from "./TextFieldComponent.module.css";

interface TextFieldComponentProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  name,
  label,
  value,
  error,
  onChange,
}) => {
  const hasError = Boolean(error);

  return (
    <div>
      <TextField
        name={name}
        label={label}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={value}
        onChange={onChange}
        className={styles.textarea}
      />
      {hasError && (
        <div className={styles.errorWrapper}>
          <WarningIcon color="#d32f2f" />
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default TextFieldComponent;
