/* eslint-disable react/jsx-key */
import React, { useMemo } from "react";
import { COLUMNS } from "../data/column";
import MOCK_DATA from "../../components/data/mydata.json";
import { useTable, useSortBy } from "react-table";

const SortedTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(
    () =>
      MOCK_DATA.map((d) => ({
        ...d,
        plain_text_q: d.plain_text_q.slice(0, 400),
      })),
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    // apply the table props
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
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

export default SortedTable;
