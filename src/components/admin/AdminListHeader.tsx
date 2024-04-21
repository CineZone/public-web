import Link from "next/link";
import React from "react";

const AdminListHeader = ({
  title = "Create an entry",
  onCreateLink,
}: {
  title?: string;
  onCreateLink: string;
}) => {
  return (
    <div className="flex justify-between items-center mb-3 ">
      <div>
        <div className="text-2xl font-bold">{title}</div>
      </div>

      <Link href={onCreateLink} className={`bg-primary  font-bold p-2 px-3 rounded cursor-pointer`}>
        Create New
      </Link>
    </div>
  );
};

export default AdminListHeader;
