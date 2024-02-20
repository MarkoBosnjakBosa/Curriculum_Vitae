import { getString } from "../../utilities/i18n";
import Pdf from "./Pdf";
import defaultStyle from "../../App.module.css";
import { usePDF } from "@react-pdf/renderer";

const PdfExport = (props) => {
  const { user, skills, experienceResume, educationResume, certifications } = props;
  const [instance] = usePDF({ document: <Pdf user={user} skills={skills} experienceResume={experienceResume} educationResume={educationResume} certifications={certifications} /> });

  return (
    !instance.loading ? (
      <a href={instance.url} download={`${getString("cv.pdf.file.name")}.pdf`} className={`${defaultStyle.button} ${defaultStyle.display} ${defaultStyle.white} ${defaultStyle.green} ${defaultStyle.pointer} ${defaultStyle.noLink}`}>{getString("cv.buttons.pdf.download")}</a>
    ) : (
      <a className={`${defaultStyle.button} ${defaultStyle.display} ${defaultStyle.white} ${defaultStyle.green}`} disabled>{getString("cv.texts.loading")}</a>
    )
  );
};

export default PdfExport;
