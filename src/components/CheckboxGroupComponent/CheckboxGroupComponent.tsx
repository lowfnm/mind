import React, { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { Typography } from "@mui/material";
import WarningIcon from "../../assets/icons/WarningIcon";
import styles from "./CheckboxGroupComponent.module.css";

interface CheckboxGroupComponentProps {
  name: string;
  choices: string[];
  selectedChoices: string[];
  error?: string;
  onChange: (name: string, choice: string, checked: boolean) => void;
}

const CheckboxGroupComponent: React.FC<CheckboxGroupComponentProps> = ({
  name,
  choices,
  selectedChoices,
  error,
  onChange,
}) => {
  const hasError = Boolean(error);

  return (
    <FormGroup>
      {choices.map((choice, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              name={choice}
              checked={selectedChoices.includes(choice)}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange(name, choice, event.target.checked)
              }
            />
          }
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
    </FormGroup>
  );
};

export default CheckboxGroupComponent;
