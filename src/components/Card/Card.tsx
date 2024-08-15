import React, { ChangeEvent, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RadioGroupComponent from "../RadioGroupComponent/RadioGroupComponent";
import CheckboxGroupComponent from "../CheckboxGroupComponent/CheckboxGroupComponent";
import TextFieldComponent from "../TextFieldComponent/TextFieldComponent";
import BooleanGroupComponent from "../BooleanGroupComponent/BooleanGroupComponent";
import { SelectedChoicesProps, useAppContext } from "../../context/AppContext";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Box } from "@mui/material";
import styles from "./Card.module.css";

type ElementType = "radiogroup" | "checkbox" | "boolean" | "text";

interface Element {
  type: ElementType;
  name: string;
  title: string;
  choices?: string[];
  isRequired?: boolean;
}

interface Page {
  name: string;
  elements: Element[];
}

interface CustomCardProps {
  title: string;
  description: any[];
  questions?: {
    pages: Page[];
  };
  imageUrl?: string;
  totalPages: number;
  handleSubmit: () => void;
}

const CustomCard = ({
  title,
  description,
  questions,
  imageUrl,
  totalPages,
  handleSubmit,
}: CustomCardProps) => {
  const { currentPage, setCurrentPage, selectedChoices, setSelectedChoice } =
    useAppContext();
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const page = questions?.pages[currentPage];

  const handleChoiceChange = (name: string, value: string) => {
    setSelectedChoice(name, [value]);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleBooleanChange = (name: string, value: string) => {
    const newValue = value === "Yes" ? "Yes" : "No";
    setSelectedChoice(name, [newValue]);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleCheckboxChange = (
    name: string,
    choice: string,
    checked: boolean
  ) => {
    const currentChoices = selectedChoices[name] || [];
    const updatedChoices = checked
      ? [...currentChoices, choice]
      : currentChoices.filter((currChoice) => currChoice !== choice);
    setSelectedChoice(name, updatedChoices);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTextAnswers((prev) => ({ ...prev, [name]: value }));
    setSelectedChoice(name, [value]);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleNextPage = () => {
    const newErrors: Record<string, string> = {};
    if (page) {
      page.elements.forEach((element) => {
        if (element.type === "text") {
          if (!textAnswers[element.name]?.trim()) {
            newErrors[element.name] = "This field is required";
          }
        } else if (element.type === "radiogroup") {
          if (!selectedChoices[element.name]?.length) {
            newErrors[element.name] = "This field is required";
          }
        } else if (element.type === "checkbox") {
          if (!selectedChoices[element.name]?.length) {
            newErrors[element.name] = "At least one option must be selected";
          }
        } else if (element.type === "boolean") {
          if (!selectedChoices[element.name]?.length) {
            newErrors[element.name] = "This field is required";
          }
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    if (currentPage < (questions?.pages.length || 0) - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page) {
      const initialTextAnswers: Record<string, string> = {};
      page.elements.forEach((element) => {
        if (element.type === "text") {
          initialTextAnswers[element.name] =
            selectedChoices[element.name]?.[0] || "";
        }
      });
      setTextAnswers(initialTextAnswers);
    }
  }, [page, selectedChoices]);

  useEffect(() => {
    if (page) {
      const initialSelectedChoices: SelectedChoicesProps = {};
      page.elements.forEach((element) => {
        initialSelectedChoices[element.name] = [];
      });
      Object.keys(initialSelectedChoices).forEach((key) => {
        setSelectedChoice(key, initialSelectedChoices[key]);
      });
    }
  }, [page]);

  if (!page) return null;

  const renderComponentByType = (element: Element) => {
    if (element.type === "radiogroup" && element.choices) {
      return (
        <RadioGroupComponent
          name={element.name}
          choices={element.choices}
          selectedValue={selectedChoices[element.name]?.[0] || ""}
          onChange={(value) => handleChoiceChange(element.name, value)}
          error={errors[element.name]}
        />
      );
    } else if (element.type === "checkbox" && element.choices) {
      return (
        <CheckboxGroupComponent
          name={element.name}
          choices={element.choices}
          selectedChoices={selectedChoices[element.name] || []}
          onChange={handleCheckboxChange}
          error={errors[element.name]}
        />
      );
    } else if (element.type === "text") {
      return (
        <TextFieldComponent
          name={element.name}
          label={element.title}
          value={textAnswers[element.name] || ""}
          onChange={handleTextChange}
          error={errors[element.name]}
        />
      );
    } else if (element.type === "boolean") {
      return (
        <BooleanGroupComponent
          name={element.name}
          selectedValue={selectedChoices[element.name]?.[0] || ""}
          onChange={(value) => handleBooleanChange(element.name, value)}
          error={errors[element.name]}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Card>
      {imageUrl && (
        <CardMedia component="img" alt={title} height="140" image={imageUrl} />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <div className={styles.textContainer}>
            <div className={styles.contentWrapper}>
              {description.map((item, index) => {
                const props = {
                  key: index,
                  className:
                    item.type === "p"
                      ? styles.paragraph
                      : item.type === "h1"
                      ? styles.heading
                      : null,
                };
                const elementToString = item.props.children.toString();
                const element =
                  isExpanded && elementToString && item.type !== "p"
                    ? elementToString
                    : elementToString && item.type === "p" && !isExpanded
                    ? elementToString.slice(0, 100) + "..."
                    : elementToString;
                return React.createElement(item.type, props, element);
              })}
            </div>
            <span className={styles.expandBtnWrapper}>
              <span
                onClick={() => setIsExpanded((prev) => !prev)}
                className={styles.expandBtn}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </span>
            </span>
          </div>
        </Box>
        <ProgressBar steps={totalPages} filledProgress={currentPage + 1} />
        <div className={styles.questionContainer}>
          {page.elements.map((element, elementIndex) => (
            <div
              key={elementIndex}
              className={`${styles.questionItem} ${
                errors[element.name] && styles.questionItemError
              }`}
            >
              <div className={styles.questionTitle}>
                <Typography variant="subtitle1" component="p">
                  {element.title}
                </Typography>
              </div>
              <div className={`${styles.choiseWrapper}`}>
                {renderComponentByType(element)}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.btnNextWrapper}>
          {totalPages === currentPage + 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={styles.nextBtn}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextPage}
              className={styles.nextBtn}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
