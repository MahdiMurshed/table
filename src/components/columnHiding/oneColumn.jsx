/* eslint-disable react/jsx-key */
import React, { useMemo } from "react";
import { COLUMNS } from "./data/column";
import MOCK_DATA from "./data/realData.json";
import MOCK_DATA2 from "./data/mydata.json";
import { useTable, useGlobalFilter } from "react-table";
import { GlobalFilter } from "../filter/GlobalFilter";
import draftToHtml from "draftjs-to-html";

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(
    () =>
      MOCK_DATA.map((d, i) => ({
        ...d,
        type: d.question_type.name,
        hidden: MOCK_DATA2[i].plain_text_q,

        question_text: draftToHtml(d.question_text),
      })),
    []
  );
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;
  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, i) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column, i) => (
                    // Apply the header cell props
                    <th
                      // Return an array of prop objects and react-table will merge them appropriately
                      {...column.getHeaderProps([
                        {
                          className: column.className,
                          style: column.style,
                        },
                      ])}
                    >
                      {column.render("Header")}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row, i) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td
                          // Return an array of prop objects and react-table will merge them appropriately
                          {...cell.getCellProps([
                            {
                              className: cell.column.className,
                              style: cell.column.style,
                            },
                          ])}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};

export default BasicTable;
