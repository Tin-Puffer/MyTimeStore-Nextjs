import React, { useEffect, useState } from "react";
import { Blog, product } from "../common/product/interface";
import {
  HomeCarousel,
  HomeNews,
  HomeProduct,
  HomeSelect,
  OutBlog,
  SliderProduct,
} from "../components/HomeComponent";
import { Fproduct } from "../fakeData/Fproduct";
import { BlogAPI } from "./api/Blog";
import { ProductHomeAPI } from "./api/productAPI/Home";

export default function Home({ blogList }: { blogList: Blog[] }) {
  const [productList, setProducList] = useState<product[]>();
  const [productSlider, setProducSlider] = useState<product[]>();
  const loadData = async () => {
    const listTmp: product[] = await ProductHomeAPI.getProduct();
    const liderTmp: product[] = await ProductHomeAPI.getProductBestSell();
    setProducList(listTmp);
    setProducSlider(liderTmp);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="">
      <HomeCarousel></HomeCarousel>
      <HomeSelect></HomeSelect>

      <HomeProduct products={productList}></HomeProduct>
      <SliderProduct productSlider={productSlider}></SliderProduct>
      <HomeNews></HomeNews>
      <OutBlog blogList={blogList}></OutBlog>
    </div>
  );
}

//===========================server main FAKE ================
// export async function getServerSideProps() {

//   const productList = Fproduct;
//   const productSlider = Fproduct;

//   return {
//     props: {
//       productList,
//       productSlider,

//     },
//   };
// }

//===========================server main REAL ================

// export async function getServerSideProps() {
//   const productList: product[] = await ProductHomeAPI.getProduct();
//   const productSlider = await ProductHomeAPI.getProductBestSell();

//   const blogList = await BlogAPI.getNewBlog(5);
//   return {
//     props: {
//       productList,
//       productSlider,
//       blogList,
//     },
//   };
// }

export async function getStaticProps() {
  const blogList = await BlogAPI.getNewBlog(5);

  return {
    props: { blogList },
  };
}
