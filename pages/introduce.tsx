import { Introduct } from "../components/IntroductComponent/Introduce";

export default function IntroductPage() {
  return (
    <div className="">
      <Introduct></Introduct>
    </div>
  );
}
export async function getStaticProps() {
  return {
    props: {}, 
  };
}
