import { forwardRef } from "react";
import { getString } from "../../utilities/i18n";
import TitleLayout from "../layouts/TitleLayout";
import WrapperLayout from "../layouts/WrapperLayout";
import CarouselLayout from "../layouts/CarouselLayout";
import defaultStyle from "../../App.module.css";

const References = forwardRef((props, ref) => {
  const { certifications, customers } = props;
  const { certificationsRef, customersRef } = ref;

  return (
    <>
      <TitleLayout ref={certificationsRef} title={getString("cv.sections.certifications")} customization={defaultStyle.sectionMarginTop} />
      <WrapperLayout><CarouselLayout references={certifications} /></WrapperLayout>
      <TitleLayout ref={customersRef} title={getString("cv.sections.customers")} customization={defaultStyle.sectionMarginTop} />
      <WrapperLayout><CarouselLayout references={customers} /></WrapperLayout>
    </>
  );
});

export default References;
