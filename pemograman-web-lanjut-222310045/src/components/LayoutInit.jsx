import React, { Children } from "react";
import Footers from "./Footers";
import Headers from "./Headers";

export default function LayoutInit({ children }) {
  return (
    <div>
      <Headers />

      <section className="container">{children}</section>

      <Footers />
    </div>
  );
}
