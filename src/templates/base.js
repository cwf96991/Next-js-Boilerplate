import { Meta } from "../layout/Meta";
// import Navbar from "./Navbar";
// import { AnimationOnScroll } from "react-animation-on-scroll";
// import { Footer } from "./Footer";
// import { AppConfig } from "../utils/AppConfig";

const Basic = (props) => {
  return (
    <div className="antialiased text-gray-600 font-sans bg-white">
      {/* <Meta
        title={`${props.title} | ${AppConfig.title}`}
        description={AppConfig.description}
        canonical={AppConfig.url}
        ogTitle={AppConfig.ogTitle}
        ogDescription={AppConfig.ogDescription}
      /> */}
      {/* <Navbar
        graidentStyle={AppConfig.graidentStyle}
        isHelpCenter={props.isHelpCenter}
        isAboutUs={props.isAboutUs}
        isHide={props.isHide}
      /> */}

      {props.children}

      {/* <AnimationOnScroll animateIn="animate__fadeIn">
        <Footer />
      </AnimationOnScroll> */}
    </div>
  );
};
export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
export default Basic;
