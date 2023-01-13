import { GetServerSideProps } from "next";
import {
  DetailProduct,
  ProductDecription,
  SameProduct,
} from "../../components/DetailProductComponent";

export default function Detail() {
  return (
    <div className="">
      <DetailProduct></DetailProduct>
      <ProductDecription></ProductDecription>
      <SameProduct></SameProduct>
    </div>
  );
}
export async function getServerSideProps(context: any) {
  console.log("context: ", context.params);

  const productList = "";
  // const productSlider = Fproduct;
  if (context.params.id == "hot") {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      productList,
    },
  };
}
