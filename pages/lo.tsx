import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../app/Hook";

import styles from "../styles/Home.module.css";

export default function Home() {

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (typeof window !== "undefined") {
        let hes = document.querySelector(".xxx");
        hes?.classList.toggle("sticky", window.scrollY > 300);
      }
    });
    return window.removeEventListener("scroll", () => {});
  }, []);
  return (
    <div className={styles.container} style={{ height: "2000px" }}>
      <div style={{ width: "100%", height: "500px" }}></div>
      <div className="xxx">
        <h1>nguyen tin</h1>
      </div>
    </div>
  );
}
