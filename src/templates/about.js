import Base from "./Base";
import { useTranslations } from "next-intl";

 const About = () => {
  const t = useTranslations("Home");
  return (
    <div>
      <Base>{t("testing")}</Base>
    </div>
  );
};

export default About