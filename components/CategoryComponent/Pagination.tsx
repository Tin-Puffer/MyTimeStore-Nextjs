import { Pagination } from "antd";

export function PaginationCustom({
  total,
  pagenow,
  handleChange,
}: {
  total: number;
  pagenow: number;
  handleChange: Function;
}) {
  const onChange = (page: number) => {
    handleChange(page - 1);
  };

  if (total <= 1) return <></>;
  else {
    return (
      <Pagination
        pageSize={1}
        showSizeChanger={false}
        itemRender={(page, type, originalElement) => {
          if (type === "next") {
            return (
              <div className="box">
                <b className="box-txt">»</b>
              </div>
            );
          }
          if (type === "prev") {
            return (
              <div className="box">
                <b className="box-txt">«</b>
              </div>
            );
          }
          if (type === "page") {
            return (
              <div className="box">
                <b className="box-txt">{page}</b>
              </div>
            );
          }
          return originalElement;
        }}
        current={pagenow + 1}
        onChange={onChange}
        total={total}
      />
    );
  }
}
