export const COLUMNS = [
  {
    Header: "Questions",

    accessor: "question_text",
    Cell: ({ row }: any) => {
      console.log("row", row);
      return (
        <div dangerouslySetInnerHTML={{ __html: row.values.question_text }} />
      );
    },
    disableFilters: true,
  },
  {
    Header: "Main Source",

    accessor: "main_source",
  },
  {
    Header: "Sub Source",

    accessor: "sub_source",
  },
  {
    Header: "Type",

    accessor: "type",
  },
  {
    Header: "Topic",

    accessor: "topic",
  },
];
