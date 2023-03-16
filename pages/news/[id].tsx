import { Blog, DetailNewType } from "../../common/product/interface";
import { DetailNew } from "../../components/DetailNewComponent";
import { BlogAPI } from "../api/Blog";

export default function DetailNewPage({
  detailNew,
  blog
}: {
  detailNew: DetailNewType;
  blog:Blog
}) {
  return (
    <div className="">
      <DetailNew detailNew={detailNew} blog={blog}></DetailNew>
    </div>
  );
}
export const getStaticPaths = async () => {
  const pa = ["1"];
  const ways = pa.map((pa) => ({
    params: { id: pa.toString() },
  }));

  return {
    paths: ways,
    // fallback: false // bat ki path nao k returned boi getStaticPaths se toi trang 404
    fallback: true, // path nao k returned ngay lap tuc se show trang "tam thoi" => doi getStaticProps chay
    // => getStaticProps chay xong => return trang hoan chinh
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  console.log("run fetch data :", params.id);
  const detailNew = await BlogAPI.getDeltailBlog(params.id);
  const blog= await BlogAPI.getBlog(params.id)
  if (!detailNew) {
    return { notFound: true }
  }
  return {
    props: {
      detailNew: detailNew,
      blog:blog
    }
    // props: { xxx2 },
    // revalidate: 20,
    // will be passed to the page component as props
  };
};
