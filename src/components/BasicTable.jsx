/* eslint-disable react/jsx-key */
import React from "react";
import {
  useTable,
  useGlobalFilter,
  useRowSelect,
  useFilters,
} from "react-table";
import { Checkbox } from "./RowSelection/CheckBox";
import TableHelper from "../TableHelper";
import { SelectColumnFilter } from "./filter/columnFIlter";

const BasicTable = ({ columns, data, type }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: SelectColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
    allColumns,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        type === "show"
          ? {
              id: "null",
            }
          : {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }) => (
                <Checkbox {...row.getToggleRowSelectedProps()} />
              ),
            },
        ...columns,
      ]);
    }
  );
  const { globalFilter } = state;
  console.log({ selectedFlatRows });

  return (
    <>
      <TableHelper
        filter={globalFilter}
        setFilter={setGlobalFilter}
        columns={allColumns}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        maxWidth: "500px",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
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

export default BasicTable;
