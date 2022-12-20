import Head from "next/head";
import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@/components/layout";
import { _5M1ESettingStore } from "@/store";
import { useEffect, useState } from "react";
import SelectRequestProblemModal from "@/views/select-request-problem-modal";
import { ISelectProblemRequestForm } from "@/types/request-form.type";
import { useRouter } from "next/router";
import { RequestProblemIdParamName } from "@/constant";

const _5M1E: NextPage = () => {
  const { fetchSetting, canCreateProblemRequest, canCreateChangePointRequest } =
    _5M1ESettingStore();
  const router = useRouter();
  const [selectRequestModal, setSelectRequestModal] = useState<boolean>(false);

  useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  const handleSelectRequestProblem = (form: ISelectProblemRequestForm) => {
    const query: any = {};
    if (form.requestProblemId !== "-1") {
      query[RequestProblemIdParamName] = form.requestProblemId;
    }
    router.push({
      pathname: "/5m1e/report/change-point",
      query: query,
    });
  };
  const handleCancelSelectRequest = () => {
    setSelectRequestModal(false);
  };

  return (
    <>
      <div>
        <Head>
          <title>5M1E Report</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <Layout title="5M1E Report" backable>
        <div className="w-full h-full flex flex-col justify-center">
          <div className="link-group animate__animated animate__fadeIn text-2xl text-center">
            <Link href={"/5m1e/report"}>
              <p>Overview</p>
            </Link>
            {canCreateProblemRequest() ? (
              <Link href={"/5m1e/report/problem"}>
                <p>Report - Problem</p>
              </Link>
            ) : null}
            {canCreateChangePointRequest() ? (
              <div onClick={() => setSelectRequestModal(true)}>
                <p>Report - Change Point</p>
              </div>
            ) : null}
          </div>
        </div>
        <SelectRequestProblemModal
          title="Select Problem Request"
          visible={selectRequestModal}
          onFinish={handleSelectRequestProblem}
          onCancel={handleCancelSelectRequest}
        />
      </Layout>
    </>
  );
};

export default _5M1E;
