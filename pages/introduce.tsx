import { Introduct } from "../components/IntroductComponent/Introduce";

export default function IntroductPage({ posts }: { posts: any }) {
  return (
    <div className="">
      <Introduct></Introduct>
    </div>
  );
}
export async function getStaticProps() {
  const posts = "";
  return {
    props: {
      posts,
    },
  };
}
