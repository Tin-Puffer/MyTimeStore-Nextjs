import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/Hook";
import { DefaultLayout } from "../components/layout/DefaultLayout";

import styles from "../styles/Home.module.css";

export default function Home() {
  return <DefaultLayout></DefaultLayout>;
}
