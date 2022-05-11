import draftToHtml from "draftjs-to-html";
import type { NextPage } from "next";
import { useMemo } from "react";
import BasicTable from "../src/components/BasicTable";

import { COLUMNS } from "../src/components/data/column";
import MOCK_DATA from "../src/components/data/realData.json";

const Home: NextPage = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(
    () =>
      MOCK_DATA.map((d) => ({
        ...d,
        question_text: draftToHtml(d.question_text),
      })),
    []
  );
  return <BasicTable columns={columns} data={data} type="select" />;
};

export default Home;
