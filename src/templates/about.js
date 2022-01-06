import Base from "./Base";
import { useTranslations } from "next-intl";
import dynamic from 'next/dynamic'
const ConnectWallet = dynamic(() => import('../components/CollectWallet'), {
  ssr: false
})

const About = () => {
  const t = useTranslations("Home");
  return (
    <div>
      <Base>
      <ConnectWallet />
      </Base>
    </div>
  );
};

export default About;
