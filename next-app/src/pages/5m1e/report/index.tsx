import { getAllRequest } from "@/actions";
import Layout from "@/components/layout";
import { RequestTable } from "@/views/tables/request-table";
import { _5M1ESettingStore } from "@/store";
import { _5M1ERequestStore } from "@/store/5m1e-request.store";
// import { UserStore } from "@/store/user.store";
import { RequestFilter } from "@/views/request-filter";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { IRequestFilterForm } from "@/types/request-form.type";
import { filterRequestByForm } from "@/functions";
import { LayoutStore } from "@/store/layout.store";
import { _5M1ERequest } from "@/types/request.type";

const _5M1EReportOverview: NextPage = () => {
  const { fetchSetting } = _5M1ESettingStore();
  // const { user } = UserStore.getState();
  const { setIsLoading } = LayoutStore();
  const { requestList } = _5M1ERequestStore();

  const [filterForm, setFilterForm] = useState<IRequestFilterForm>({});

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchSetting(), getAllRequest()]).then(() => {
      setIsLoading(false);
    });

    return () => {
      setIsLoading(false);
    };
  }, [fetchSetting, setIsLoading]);

  const filteredRequestList = useMemo(
    () =>
      filterRequestByForm(requestList, filterForm).filter(
        (request) =>
          request.current_state_id !== 6 && request.current_state_id !== 16
      ),
    [filterForm, requestList]
  );

  const OnSearch = (form: IRequestFilterForm) => {
    setFilterForm(form);
  };

  return (
    <>
      <div>
        <Head>
          <title>5M1E Reports Overview</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <Layout title="5M1E Reports Overview" backRoute="/5m1e" backable>
        <RequestFilter onFinish={OnSearch} />
        <RequestTable data={filteredRequestList} />
      </Layout>
    </>
  );
};

export default _5M1EReportOverview;
