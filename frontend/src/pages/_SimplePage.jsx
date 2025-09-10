import React from "react";
export default function _SimplePage({ title="", children }){
  return <main style={{padding:"1.5rem"}}><h1>{title}</h1><div>{children}</div></main>;
}
