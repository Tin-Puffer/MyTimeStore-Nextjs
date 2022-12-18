import { useRouter } from "next/router";
import {
  CategoryTitle,
  CategoryContainer,
} from "../../components/CategoryComponent";
// import cssH from "./ProductStyle.module.scss";
import cssH from "../../components/HomeComponent/ProductStyle.module.scss";

export default function Category() {
  const x = useRouter();
  // console.log(x);

  return (
    <div className={cssH.gridPoduct} style={{ marginTop: 0 }}>
      <CategoryTitle></CategoryTitle>
      <CategoryContainer></CategoryContainer>
    </div>
  );
}
