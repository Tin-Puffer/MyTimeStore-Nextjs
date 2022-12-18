import React, { useEffect, useRef, useState } from "react";
import {
  HomeCarousel,
  HomeNews,
  HomeProduct,
  HomeSelect,
  OutBlog,
  SliderProduct,
} from "../components/HomeComponent";

export default function Home() {
  return (
    <div className="">
      <HomeCarousel></HomeCarousel>
      <HomeSelect></HomeSelect>
      <div style={{ padding: "30px 0" }}></div>
      <HomeProduct></HomeProduct>
      <SliderProduct></SliderProduct>
      <HomeNews></HomeNews>
      <OutBlog></OutBlog>
    </div>
  );
}
