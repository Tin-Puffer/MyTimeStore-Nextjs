import React, { useEffect, useRef, useState } from "react";
import { HomeCarousel, HomeProduct, HomeSelect } from "../components/HomeComponent";

export default function Home() {
  return (
    <div className="">
      <HomeCarousel></HomeCarousel>
      <HomeSelect></HomeSelect>
      <div style={{padding:"30px 0"}}></div>
      <HomeProduct></HomeProduct>
    </div>
  );
}
