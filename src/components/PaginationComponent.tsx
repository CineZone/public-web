import { Pagination } from "@/types";
import React, { useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  onPageChange: (page: number) => void;
  pagination: Pagination;
};

const PaginationComponent = ({ pagination, onPageChange }: Props) => {
  const pagesArray = useMemo(() => {
    // if total pages are less then 3
    if (pagination.totalPages <= 3) {
      let array = [];
      for (let i = 1; i <= pagination.totalPages; i++) {
        array.push(i);
      }
      return array;
      // if greater then 3
    } else {
      // then then 3 page open
      if (pagination.page < 3) {
        return [1, 2, 3];
      }
      // greater than 3 open
      else {
        if (pagination.page != pagination.totalPages) {
          return [pagination.page - 1, pagination.page, pagination.page + 1];
        } else {
          return [pagination.page - 2, pagination.page - 1, pagination.page];
        }
      }
    }
  }, [pagination]);
  return (
    <div className="flex w-full justify-end flex-wrap mt-5">
      <div className=" flex justify-between items-center">
        <FaArrowLeft
          className={`fa-solid fa-arrow-left mr-3 ${
            pagination.page !== 1
              ? "text-primary-light cursor-pointer hover:scale-125"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => {
            onPageChange(pagination.page - 1);
          }}
        />

        {pagesArray.map((item) => (
          <div
            className={`bg-gray-900 mr-1 px-2 h-[30px] min-w-[30px] items-center flex justify-center font-bold   ${
              pagination.page == item
                ? "text-primary-light cursor-default"
                : "text-white hover:text-white hover:bg-primary cursor-pointer"
            }`}
            key={item}
            onClick={() => {
              onPageChange(item);
            }}
          >
            {item}
          </div>
        ))}
        <FaArrowRight
          className={`fa-solid fa-arrow-right ml-2 ${
            pagination.totalPages !== pagination.page
              ? "text-primary-light cursor-pointer hover:scale-125"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => {
            onPageChange(pagination.page + 1);
          }}
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
