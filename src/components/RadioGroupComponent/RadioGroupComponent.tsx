import React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { Typography } from "@mui/material";
import WarningIcon from "../../assets/icons/WarningIcon";
import styles from "./RadioGroupComponent.module.css";

interface RadioGroupComponentProps {
  name: string;
  choices: string[];
  selectedValue: string;
  error?: string;
  onChange: (value: string) => void;
}

const RadioGroupComponent: React.FC<RadioGroupComponentProps> = ({
  name,
  choices,
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
      {choices.map((choice, index) => (
        <FormControlLabel
          key={index}
          value={choice}
          control={<Radio />}
          label={choice}
        />
      ))}
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

export default RadioGroupComponent;
