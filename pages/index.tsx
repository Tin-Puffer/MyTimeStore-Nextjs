import React from "react";
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

export default function Home({
  productList,
  productSlider,
  blogList,
}: {
  productList: product[];
  productSlider: product[];
  blogList: Blog[];
}) {
  return (
    <div className="">
      <HomeCarousel></HomeCarousel>
      <HomeSelect></HomeSelect>
      <div style={{ padding: "30px 0" }}></div>
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
export async function getServerSideProps() {
  const productList: product[] = await ProductHomeAPI.getProduct();
  const productSlider = await ProductHomeAPI.getProductBestSell();
  const blogList = await BlogAPI.getNewBlog(3);

 

  return {
    props: {
      productList,
      productSlider,
      blogList,
    },
  };
}

