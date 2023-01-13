import { ReactNode } from "react";
import css from "../styles/notFound.module.css";
FourOhFour.getLayout = function (page: ReactNode) {
  return <div>{page}</div>;
};
export default function FourOhFour() {
  return (
    <>
      <div className={css.html}>
        <div className={css.eror}>404</div>
        <br />
        <br />
        <span className={css.info}>File not found</span>
      </div>
    </>
  );
}
