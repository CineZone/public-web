import { GenreList } from "@/types";
import getGenreColor from "@/utils/getGenreColor";
import React from "react";

const RenderGenres = ({ genres }: { genres: string[] | number[] }) => {
  return (
    <div className="flex gap-1 py-2 flex-wrap">
      {genres.map((item, index) => {
        const color = getGenreColor(item as string);

        return (
          <div
            style={{
              borderColor: color,
              color: color,
            }}
            key={item + " " + index}
            className={` border-[1px] w-fit p-1 text-xs rounded-lg`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default RenderGenres;
