import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { product } from "../common/product/interface";
import {
  HomeCarousel,
  HomeNews,
  HomeProduct,
  HomeSelect,
  OutBlog,
  SliderProduct,
} from "../components/HomeComponent";
import { Fproduct } from "../fakeData/Fproduct";
import { ProductHomeAPI } from "./api/productAPI/Home";

export default function Home({ productList }: { productList: product[] }) {
  console.log("posst", productList);
  return (
    <div className="">
      <HomeCarousel></HomeCarousel>
      <HomeSelect></HomeSelect>
      <div style={{ padding: "30px 0" }}></div>
      <HomeProduct products={productList}></HomeProduct>
      <SliderProduct></SliderProduct>
      <HomeNews></HomeNews>
      <OutBlog></OutBlog>
    </div>
  );
}
// export async function getStaticProps() {
//   // const productList: product[] = await ProductHomeAPI.getProduct();
//   const productList = Fproduct;
//   return {
//     props: {
//       productList,
//     },
//   };
// }
export async function getServerSideProps() {
  // const productList: product[] = await ProductHomeAPI.getProduct();
  const productList = Fproduct;
  return {
    props: {
      productList,
    },
  };
}
