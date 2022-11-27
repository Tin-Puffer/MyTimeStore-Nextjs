import React, { useEffect, useRef, useState } from "react";
import {
  HomeCarousel,
  HomeNews,
  HomeProduct,
  HomeSelect,
  SliderProduct,
} from "../components/HomeComponent";
import { HomeDigital } from "../components/HomeComponent/HomeDigital";

export default function Home() {
  return (
    <div className="">
      <HomeCarousel></HomeCarousel>
      <HomeSelect></HomeSelect>
      <div style={{ padding: "30px 0" }}></div>
      <HomeProduct></HomeProduct>
      <SliderProduct></SliderProduct>
      <HomeDigital></HomeDigital>
      <HomeNews></HomeNews>
    </div>
  );
}
