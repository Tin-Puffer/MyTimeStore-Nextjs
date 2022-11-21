import axios from "axios";
import { GetServerSideProps } from "next";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/Hook";

const DeltailSotory = ({ xxx2 }: any) => {
  const [img, setImg] = useState<any>("");
  const [y, x] = useState<number>(0);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: "",
      query: {
        id: 1,
      },
    });
  };
  const handleClickx = () => {
    x((pt) => pt + 1);
  };
  const handleClick2 = () => {
    router.push({
      pathname: "",
      query: {
        id: 3,
      },
    });
  };
  useEffect(() => {
    (async () => {
      await axios
        .get(`https://63750c5348dfab73a4f0903b.mockapi.io/line?id=${y}`)
        .then((res) => {
          console.log(res.data[0].avatar);
          setImg(res.data[0].avatar);
        });
    })();
  }, [y]);
  return (
    <>
      <div>DeltailSotory</div>
      <button onClick={handleClick}>cline A</button>
      {loading && <h1>loading .....</h1>}
      <button onClick={handleClick2}>cline B</button>
      <img src={xxx2?.avatar} alt="" />
      {img && <img src={img} alt="" onClick={handleClickx} />}
      <h1>{y}</h1>
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const xxx = await axios.get(
//       `https://63750c5348dfab73a4f0903b.mockapi.io/line?id=2`
//     );
//     const xxx2 = "sdfsdfsdf";
//     return {
//       props: { xxx2 }, // will be passed to thcleae page component as props
//     };
//   }
// );

export const getServerSideProps: GetServerSideProps = async () => {
  // console.log("context :",context.res);
  console.log("rerender:");
  // const islogin = useAppSelector((state) => state.auth.login);

  const xxx = await axios.get(
    `https://63750c5348dfab73a4f0903b.mockapi.io/line?id=2`
  );

  const xxx2 = xxx.data[0];
  // console.log("run fetch data :", context.query.id);
  return {
    props: { xxx2 }, // will be passed to the page component as props
  };
};

export default DeltailSotory;
