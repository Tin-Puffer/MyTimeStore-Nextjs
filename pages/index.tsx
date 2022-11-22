import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../app/Hook";

import styles from "../styles/Home.module.css";

export default function Home() {
  const ditpatch = useAppDispatch();
  const islogin = useAppSelector((state) => state.auth.login);
  const router = useRouter();
  const [ref, inView] = useInView();
  const [ref1, inView1] = useInView();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (typeof window !== "undefined") {
        let hes = document.querySelector(".xxx");
        hes?.classList.toggle("sticky", window.scrollY > 300);
      }
    });
  }, []);
  return (
    <div className={styles.container} style={{ height: "2000px" }}>
      <div style={{ width: "100%", height: "200px" }}></div>
      {<div ref={ref} className="xxx"></div>}
    </div>
  );
}
