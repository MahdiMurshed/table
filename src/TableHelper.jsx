import { Paper } from "@mui/material";
import React from "react";
import { GlobalFilter } from "./components/filter/GlobalFilter";

const TableHelper = ({ filter, setFilter, columns }) => {
  return (
    <div
      style={{
        display: "flex",

        justifyContent: "space-between",
        padding: "0.5rem 1rem",
        margin: "0.5rem 0",
        alignItems: "center",
        padding: "0.5rem 1rem",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 2px 6px 12px -2px, rgba(0, 0, 0, 0.3) 4px 3px 7px -3px",
      }}
    >
      <GlobalFilter filter={filter} setFilter={setFilter} />
      <div
        style={{
          display: "flex",

          alignItems: "center",
          justifyContent: "flex-start",
          gap: "1rem",
        }}
      >
        <h4>Show Columns</h4>
        <div style={{ display: "flex" }}>
          {columns.slice(1).map((column) => (
            <div key={column.id}>
              <label
                style={{
                  // backgroundColor: "green",
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "sans-serif",
                }}
              >
                <div>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                  {column.Header}
                </div>
              </label>
            </div>
          ))}
        </div>
        <br />
      </div>
    </div>
  );
};

export default TableHelper;
