import React, { useEffect, useState } from "react";
import { groupCount, offsetValue } from "../config";

const usePagination = (length, offset, groupCount) => {
  console.log(length);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGroup, setTotalGroup] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);

  useEffect(() => {
    setTotalPage(Math.ceil(length / offset));
  }, [length]);

  return {
    total: totalPage,
  };
};

export default usePagination;
