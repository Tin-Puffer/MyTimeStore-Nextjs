import { GetServerSideProps } from "next";
import { Blog } from "../../common/product/interface";
import { News } from "../../components/NewComponent";
import { BlogAPI } from "../api/Blog";

export default function NewPage({
  listBlog,
  listnew,
}: {
  listBlog: Blog[];
  listnew: Blog[];
}) {
  return (
    <div>
      <News listBlog={listBlog} listnew={listnew}></News>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const listBlog = await BlogAPI.getAllBlog();
  const listnew = await BlogAPI.getNewBlog();

  console.log("render sv");
  return {
    props: {
      listBlog: listBlog,
      listnew: listnew,
    },
  };
};
