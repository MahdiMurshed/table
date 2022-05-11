/* eslint-disable react/jsx-key */
import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "../data/column";
import MOCK_DATA from "../data/mydata.json";
import { Checkbox } from "../RowSelection/CheckBox";

export const ColumnHiding = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = useTable({
    columns,
    data,
  });

  return (
    <>
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
          {allColumns.map((column) => (
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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
