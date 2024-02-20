import { convertString } from "../../utilities/scripts";
import style from "./Layouts.module.css";
import { InputLabel, MenuItem, FormControl, FormHelperText, Select } from "@mui/material";

const SelectLayout = (props) => {
  const { value, label, error, required, options, onChange, onBlur } = props;

  return (
    <FormControl error={error ? true : false} required={required ? true : false} fullWidth className={style.field}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select value={value ? options.filter((option) => option.id === value)[0] : ""} label={label} labelId={label} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option}>{option.title}</MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText className={style.text}>{`Please provide a valid ${convertString(label, false)}!`}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectLayout;
