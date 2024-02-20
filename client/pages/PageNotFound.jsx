import { Link } from "react-router-dom";
import { get } from "../utilities/language";
import { getString } from "../utilities/i18n";
import MessageLayout from "../components/layouts/MessageLayout";
import defaultStyle from "../App.module.css";
import { Button } from "@mui/material";
import { Home } from "@mui/icons-material";

const PageNotFound = () => {
  const { isGerman } = get();

  return (
    <div className={`${defaultStyle.auto} ${defaultStyle.smallContent} ${defaultStyle.marginTop} ${defaultStyle.marginBottom}`}>
      <MessageLayout message={getString("cv.texts.page.not.found")} isGerman={isGerman} />
      <div className={defaultStyle.center}>
        <Link to="/">
          <Button type="button" variant="contained" endIcon={<Home />}>{getString("cv.sections.about")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
