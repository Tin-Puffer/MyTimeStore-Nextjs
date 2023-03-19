import { GetServerSideProps } from "next";
import { Blog } from "../../common/product/interface";
import { News } from "../../components/NewComponent";
import { BlogAPI } from "../api/Blog";

export default function NewPage({
  listBlog,
  listnew,
  total,
}: {
  listBlog: Blog[];
  listnew: Blog[];
  total: number;
}) {
  return (
    <div>
      <News total={total} listBlog={listBlog} listnew={listnew}></News>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageNumber = context.query.page;
  let listBlog;
  const listnew = await BlogAPI.getNewBlog();
  if (context.query.search) {
    listBlog = await BlogAPI.getSearch(String(context.query.search));
  } else {
    listBlog = await BlogAPI.getAllBlog(Number(pageNumber));
  }

  if (listBlog)
    return {
      props: {
        listBlog: listBlog.resoult,
        total: listBlog.total,
        listnew: listnew,
      },
    };
  else {
    return { notFound: true };
  }
};
