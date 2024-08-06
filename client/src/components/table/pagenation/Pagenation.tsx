import { useState } from "react";
import { PageNationProps } from "../../../types/interface";

export const usePaginationLogic = () => {
  const [pagination, setPagination] = useState<PageNationProps>({
    page: 0,
    size: 10,
  });

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
  };

  return { pagination, handlePageChange };
};
