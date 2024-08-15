import React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { Typography } from "@mui/material";
import WarningIcon from "../../assets/icons/WarningIcon";
import styles from "./BooleanGroupComponent.module.css";

interface BooleanGroupComponentProps {
  name: string;
  selectedValue: string;
  error?: string;
  onChange: (value: string) => void;
}

const BooleanGroupComponent: React.FC<BooleanGroupComponentProps> = ({
  name,
  selectedValue,
  error,
  onChange,
}) => {
  const hasError = Boolean(error);

  return (
    <RadioGroup
      name={name}
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
    >
      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="No" control={<Radio />} label="No" />
      {hasError && (
        <div className={styles.errorWrapper}>
          <WarningIcon color="#d32f2f" />
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </div>
      )}
    </RadioGroup>
  );
};

export default BooleanGroupComponent;
