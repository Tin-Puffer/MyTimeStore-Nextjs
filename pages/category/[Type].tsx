import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  CategoryTitle,
  CategoryContainer,
} from "../../components/CategoryComponent";
// import cssH from "./ProductStyle.module.scss";
import { useEffect, useState } from "react";

import cssH from "../../components/HomeComponent/ProductStyle.module.scss";
import { Product, ProductHomeAPI } from "../api/productAPI/Home";
import { checkSale } from "../../PriceFormat";
import { product } from "../../common/product/interface";
import { filterAction, range } from "../../app/splice/categoryFilterSlipe";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/Hook";
import { Fproduct } from "../../fakeData/Fproduct";

export default function Category({
  listPRoduct,
  interest,
}: {
  listPRoduct: product[];
  interest: product[];
}) {
  const [listProduct, setListProduct] = useState<product[]>([]);
  const dispatch = useDispatch();

  const findPriceRange = () => {
    const { maxPrice, minPrice } = listPRoduct.reduce(
      (acc: any, cur: product) => {
        const price =
          checkSale(
            cur.price,
            cur.sale?.discount,
            cur.sale?.end,
            cur.sale?.begin
          ) || cur.price;
        if (price > acc.maxPrice) {
          acc.maxPrice = price;
        }
        if (price < acc.minPrice) {
          acc.minPrice = price;
        }
        return acc;
      },
      { maxPrice: 0, minPrice: Number.MAX_VALUE }
    );
    dispatch(filterAction.setRange({ maxPrice, minPrice }));
  };
  useEffect(() => {
    setListProduct(listPRoduct);
    findPriceRange();
  }, [listPRoduct]);
  return (
    <div className={cssH.gridPoduct} style={{ marginTop: 0 }}>
      <CategoryTitle interest={interest}></CategoryTitle>
      <CategoryContainer
        list={listProduct}
        interest={interest}
      ></CategoryContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const list = Fproduct;
  // const interest = Fproduct;

  const qry = context.query;
  const list = await ProductHomeAPI.getFilterProduct(qry.Type, qry.value);
  const interest = await ProductHomeAPI.getProductInterest();

  
  return {
    props: {
      listPRoduct: list,
      interest: interest,
    },
  };
};
