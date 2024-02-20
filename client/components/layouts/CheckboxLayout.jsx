import { FormControlLabel, Checkbox } from "@mui/material";

const CheckboxLayout = (props) => {
  const { checked, label, onChange } = props;

  return (
    <FormControlLabel control={<Checkbox checked={checked} />} label={label} onChange={onChange} />
  );
};

export default CheckboxLayout;
