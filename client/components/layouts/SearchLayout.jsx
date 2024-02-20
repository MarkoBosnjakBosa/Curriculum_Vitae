import { useState } from "react";
import TextFieldLayout from "./TextLayout";
import defaultStyle from "../../App.module.css";
import style from "./Layouts.module.css";
import { Search } from "@mui/icons-material";

const SearchLayout = (props) => {
  const { onSearch } = props;
  const [search, setSearch] = useState("");

  const setValue = (text) => {
    setSearch(text);
    onSearch(text.toLowerCase());
  };

  return (
    <div className={`${defaultStyle.floatRight} ${style.search}`}>
      <TextFieldLayout value={search} placeholder="Search..." onChange={(event) => setValue(event.target.value)}><Search /></TextFieldLayout>
    </div>
  );
};

export default SearchLayout;
