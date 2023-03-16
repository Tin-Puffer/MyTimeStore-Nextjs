import { Blog, DetailNewType } from "../../common/product/interface";
import FacebookComment from "../../components/CommentFB";
import { DetailNew } from "../../components/DetailNewComponent";
import { BlogAPI } from "../api/Blog";

export default function DetailNewPage({
  detailNew,
  blog,
}: {
  detailNew: DetailNewType;
  blog: Blog;
}) {
  const url = `https://mytimestore.vercel.app/news/${blog.id}`;
  return (
    <div className="">
      <DetailNew detailNew={detailNew} blog={blog}></DetailNew>
      <FacebookComment url={url} />
    </div>
  );
}
export const getStaticPaths = async () => {
  const pa = ["1"];
  const ways = pa.map((pa) => ({
    params: { id: pa },
  }));

  return {
    paths: ways,

    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  console.log("run fetch data :", params.id);
  const detailNew = await BlogAPI.getDeltailBlog(params.id);
  const blog = await BlogAPI.getBlog(params.id);
  if (!detailNew) {
    return { notFound: true };
  }
  return {
    props: {
      detailNew: detailNew,
      blog: blog,
    },
    // props: { xxx2 },
    // revalidate: 20,
    // will be passed to the page component as props
  };
};
