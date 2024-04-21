import React, { useCallback, useMemo, useRef, useState } from "react";

const MultiSelection = ({
  error,
  onChange,
  searchPlaceholder = "Search name",
  title = "Select",
  value = [],
  options = [
    { id: 1, name: "option 1" },
    { id: 1, name: "option 2" },
  ],
  disabled = false,
  onSearch = (e: string) => {},
}: {
  error?: string;
  onChange: (e: any) => void;
  searchPlaceholder?: string;
  placeholder?: string;
  title?: string;
  value?: any[];
  options?: any[];
  disabled?: boolean;
  onSearch?: (e: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const onAdd = (item: any) => {
    onChange([...value, item]);
  };

  const onRemove = (item: any) => {
    onChange(value.filter((i) => i.id !== item.id));
  };

  const notSelectedItems = useMemo(() => {
    const data = options?.filter((item) => !value.find((i) => i.id === item.id));
    return data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  }, [options, value, search]);

  return (
    <div className="w-full">
      <div className="relative w-full mb-3">
        <label htmlFor={title} className="block text-sm font-medium text-white">
          {title}
        </label>

        <div className="w-full flex flex-wrap space-x-1 mt-1">
          {value.length ? (
            value.map((item, index) => (
              <div className="bg-primary p-1 w-fit rounded text-white mb-1 flex items-center" key={index}>
                <h1>{item.name}</h1>
                {!disabled && (
                  <div
                    className="bg-red-500 h-4 w-4 rounded-full ml-2 flex items-start justify-center text-[10px] cursor-pointer hover:bg-white hover:text-black"
                    onClick={() => onRemove(item)}
                  >
                    x
                  </div>
                )}
              </div>
            ))
          ) : (
            <>
              {disabled && (
                <div className=" p-1 rounded text-slate-600 mb-1 flex items-center justify-between w-full">
                  <h1>-</h1>
                </div>
              )}
            </>
          )}
        </div>
        {!disabled && (
          <div>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
                onSearch(e.target.value);
              }}
              value={search}
              type="text"
              onFocus={() => {
                setShow(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setShow(false);
                }, 200);
              }}
              className={`bg-white p-2 focus:outline-none border-slate-300 w-full cursor-pointer  ${
                show ? "rounded-t" : "rounded"
              }`}
              placeholder={searchPlaceholder}
            />
          </div>
        )}
        {show && (
          <div className="bg-white absolute w-full z-50 shadow max-h-36 overflow-scroll">
            {notSelectedItems?.length ? (
              notSelectedItems.map((item, index) => (
                <div key={index}>
                  {index !== 0 && <hr />}
                  <div
                    className="p-1 hover:bg-primary hover:text-white cursor-pointer"
                    onClick={() => {
                      onAdd(item);
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="p-1  rounded flex justify-center">no results</div>
              </div>
            )}
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
        {/* </select> */}
      </div>
    </div>
  );
};

export default MultiSelection;
