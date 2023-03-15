import { GetServerSideProps } from "next";
import { product } from "../../common/product/interface";
import {
  DetailProduct,
  ProductDecription,
  SameProduct,
} from "../../components/DetailProductComponent";
import { Fproduct } from "../../fakeData/Fproduct";
import { ProductHomeAPI } from "../api/productAPI/Home";

export default function Detail(detailProduct: product) {
  return (
    <>
      <DetailProduct product={detailProduct}></DetailProduct>
      <ProductDecription product={detailProduct}></ProductDecription>
      <SameProduct sex={detailProduct.figures.sex} brand={detailProduct.figures.trademark}></SameProduct>
    </>
  );
}
export async function getServerSideProps(context: any) {
  
  const detailProduct = await ProductHomeAPI.getDetailProduct(
    context.params.id
    );
    
    if (detailProduct.length == 0) {
      return {
        notFound: true,
      };
    } else {
      return {
        props: detailProduct,
      };
    }
    
  // const detailProduct = Fproduct[1];
  
  // return {
  //   props: detailProduct,
  // };
}
