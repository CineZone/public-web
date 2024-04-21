import React from "react";

export default function AdminHeader({ name }: { name: string }) {
  return (
    <div className="flex break-words bg-gray-900 w-full h-14 rounded items-center">
      <div className="w-8" />
      <h1 className="font-bold text-xl text-white">{name}</h1>
      <div className="flex-1" />
      <div className="w-8" />
    </div>
  );
}
