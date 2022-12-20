import Layout from "@/components/layout";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { message } from "antd";
import { IRequestUploadResponse } from "@/types/upload.type";
import { draftRequestProblemForm, updateRequestAttachment } from "@/actions";
import { RequestProblemFormStore, _5M1ESettingStore } from "@/store";
import { IRequestForm } from "@/types/request-form.type";
import { useRouter } from "next/router";
import { _5M1EReportForm } from "@/components/forms";
import { LayoutStore } from "@/store/layout.store";

const _5M1EReportProblem: NextPage = () => {
  const { fetchSetting } = _5M1ESettingStore();
  const { setIsLoading } = LayoutStore();
  const formStore = RequestProblemFormStore();

  const router = useRouter();

  useEffect(() => {
    fetchSetting();

    return () => {
      setIsLoading(false);
    };
  }, [fetchSetting, setIsLoading]);

  const onFormFinish = async (form: IRequestForm) => {
    const attachments =
      form?.attachments?.map((attachment: any) => attachment?.originFileObj) ??
      [];
    setIsLoading(true);

    try {
      if (attachments.length > 0) {
        let requestUpload: IRequestUploadResponse;
        try {
          requestUpload = await updateRequestAttachment(attachments);
        } catch (error) {
          console.error(error);
          message.error(`Cannot upload attachments: ref ${error}`);
          throw error;
        }
        form["attachmentUrlList"] = Object.keys(requestUpload.path_map).map(
          (key) => requestUpload.path_map[key].url
        );
      }

      try {
        await draftRequestProblemForm(form);
      } catch (error) {
        console.error(error);
        message.error(`Cannot submit draft report problem form: ref ${error}`);
        throw error;
      }
    } catch {
      return;
    } finally {
      setIsLoading(false);
    }

    router.push("/5m1e/report");
  };

  return (
    <>
      <div>
        <Head>
          <title>5M1E Report system - Report Problem</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <Layout
        title="5M1E Report system - Report Problem"
        backRoute="/5m1e"
        backable
      >
        <_5M1EReportForm formStore={formStore} onFinish={onFormFinish} formType="problem"/>
      </Layout>
    </>
  );
};

export default _5M1EReportProblem;
