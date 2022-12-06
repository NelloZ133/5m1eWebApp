import Layout from '@/components/layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo } from 'react'
import { message } from 'antd'
import { _5M1ESettingStore } from '@/store'
import { _5M1EReportForm } from '@/components/forms'
import { RequestChangePointFormStore } from '@/store/request-change-point-form.store'
import { IRequestForm } from '@/types/request-form.type'
import { IRequestUploadResponse } from '@/types/upload.type'
import { draftRequestChangePointForm, updateRequestAttachment } from '@/actions'
import { useRouter } from 'next/router'
import { RequestProblemIdParamName } from '@/constant'
import { LayoutStore } from '@/store/layout.store'

const _5M1EChangePoint: NextPage = () => {
  const { fetchSetting } = _5M1ESettingStore()
  const { setIsLoading } = LayoutStore()
  const router = useRouter()
  const formStore = RequestChangePointFormStore()

  useEffect(() => {
    fetchSetting()

    return () => {
      setIsLoading(false)
    }
  }, [fetchSetting, setIsLoading])

  const requestProblemId = useMemo(() => {
    const requestProblemParams = router.query?.[RequestProblemIdParamName]

    if (typeof requestProblemParams === 'string') {
      return requestProblemParams
    }

    return null
  }, [router])

  const onFormFinish = async (form: IRequestForm) => {
    const attachments = form?.attachments?.map((attachment: any) => attachment?.originFileObj) ?? []
    setIsLoading(true)

    try {
      if (attachments.length > 0) {
        let requestUpload: IRequestUploadResponse
        try {
          requestUpload = await updateRequestAttachment(attachments)
        } catch (error) {
          console.error(error)
          message.error(`Cannot upload attachments: ref ${error}`)
          throw error
        }
        form['attachmentUrlList'] = Object.keys(requestUpload.path_map).map(key => requestUpload.path_map[key].url)
      }

      try {
        await draftRequestChangePointForm(form, requestProblemId)
      } catch (error) {
        console.error(error)
        message.error(`Cannot submit draft change point form: ref ${error}`)
        throw error
      }
    } catch {
      return
    } finally {
      setIsLoading(false)
    }

    router.push('/5m1e/report')
  }

  return (
    <>
      <div>
        <Head>
          <title>5M1E Report system - Change Point</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <Layout
        title="5M1E Report system - Change Point"
        backRoute="/5m1e"
        backable>
        <_5M1EReportForm
          formStore={formStore}
          onFinish={onFormFinish}/>
      </Layout>
    </>
  )
}

export default _5M1EChangePoint
