import { useState } from "react";
import { convertString } from "../../utilities/scripts";
import defaultStyle from "../../App.module.css";
import style from "./Layouts.module.css";
import { TextField, InputAdornment, Tooltip, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, Add } from "@mui/icons-material";

const TextLayout = (props) => {
  const { type: initialType, value, label, placeholder, error, multiline, disabled, required, onChange, onBlur, children } = props;
  const [type, setType] = useState(initialType);

  const togglePassword = () => {
    setType((previousType) => {
      if (previousType === "password") return "text";
      else return "password";
    });
  };

  return (
    <TextField
      type={type}
      value={value}
      label={label}
      placeholder={placeholder}
      helperText={error ? `Please provide a valid ${convertString(label, false)}!` : ""}
      error={error ? true : false}
      multiline={multiline}
      rows={multiline ? 2 : 1}
      InputProps={label && (label.toLowerCase() === "password") ? {
        startAdornment: (
          <InputAdornment position="start">{children}</InputAdornment>
        ),
        endAdornment: (
          <Tooltip title="Password has to have at least 8 characters, including uppercase and lowercase letters, digits and special characters.">
            <InputAdornment position="end">
              <IconButton onClick={togglePassword} onMouseDown={(event) => event.preventDefault()}>
                {(type === "password") ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          </Tooltip>
        )
      } : {
        startAdornment: (
          <InputAdornment position="start">{children}{(label && (label.toLowerCase() === "telephone")) && (<Add />)}</InputAdornment>
        )
      }}
      variant="standard"
      disabled={disabled}
      required={required}
      className={`${defaultStyle.fullWidth} ${style.field}`}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default TextLayout;
