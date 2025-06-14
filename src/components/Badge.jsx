import React from "react";

function Badge({ text }) {
  return (
    <span className=" inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset ">
      {text}
    </span>
  );
}

export default Badge;
