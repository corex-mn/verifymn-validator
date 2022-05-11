import React, {useEffect, useState} from 'react'
import * as PDFJS from 'pdfjs-dist'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import Loader from './components/Loader'
import Result from './components/Result'
import HelpIcon from './components/HelpIcon'

import PDFViewer from './pdf/PDFViewer'
import validate from './validate/validate'

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`

export default function CoreValidator({
                                        pdfArrayBuffer,
                                        closeFunction,
                                        topDisplay,
                                        bottomDisplay,
                                        blockchainServices,
                                        contactEmail,
                                        contactName,
                                        organization,
                                        docType = 'certificate',
                                      }) {
  const [loading, setLoading] = useState(true)
  const [preError, setPreError] = useState(null)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [pdf, setPdf] = useState(null)

  useEffect(() => {
    setLoading(true);

    async function parsePDF() {
      const pdfJSDocument = await PDFJS.getDocument(
          pdfArrayBuffer
      ).promise.catch(err => {
        console.error(err);
        throw new Error('PDF файлыг задлахад алдаа гарлаа.')
      })

      const pdfJSMetadata = await pdfJSDocument.getMetadata().catch(err => {
        console.error(err);
        throw new Error('PDF файлын мэта датаг задлахад алдаа гарлаа.');
      })

      setPdf(pdfJSDocument)

      validate(pdfArrayBuffer, pdfJSMetadata, blockchainServices)
          .then(res => {
            setLoading(false);
            console.log(res);
            setResult(res);
          })
          .catch(err => {
            console.error(err.message);
            setLoading(false);
            setError({detail: err.message});
          })
    }

    parsePDF().catch(err => {
      console.error(err.message)
      setLoading(false)
      setPreError(err.message)
    })
  }, [blockchainServices, pdfArrayBuffer])

  return (
      <div className="core-validator" style={{height: '100%', overflowY: 'none'}}>
        <div className="bc-clearfix" style={{height: '100%'}}>
          <div className="bc-column bc-col-left bc-text-center">
            {topDisplay}
            {loading ? (
                <Loader text={`Баталгаажуулж байна. Түр хүлээнэ үү...`}/>
            ) : (preError ?
                    <div className="bc-alert bc-alert-danger bc-text-center">
                      <FontAwesomeIcon icon={faTimesCircle}/> {preError.detail}
                    </div> :
                    <>
                      {result && result.id && result.testnet && (
                          <div style={{
                            color: '#999',
                            fontWeight: 'bolder',
                            fontSize: '32px',
                            margin: '0 0 10px 0'
                          }}>
                            TESTNET<HelpIcon
                              text={`Зөвхөн тест хийх зорилгоор Корэкс тест сүлжээнд гүйлгээ хийгдсэн байна.`}/>
                          </div>
                      )}
                      <Result
                          docType={docType}
                          result={result}
                          error={error}
                          customText={{contactEmail, contactName, organization}}
                      />
                      {bottomDisplay}
                    </>
            )
            }
          </div>
          <div className="bc-column bc-col-right">
            {pdf && <PDFViewer pdf={pdf} closeFunction={closeFunction}/>}
          </div>
        </div>
      </div>
  )
}
