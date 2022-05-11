import {requestCertificationByHash, requestIssuerByAddress} from './blockchainServices'
import {ArrayBufferToString, extractHash} from './pdfUtils'
import extractMetadata from './extractMetadata'

export default async function validate(
    pdfArrayBuffer,
    pdfJSMetadata
) {
  const metadata = await extractMetadata(pdfJSMetadata).catch(e => {
    console.error(e)
    throw new Error('Блокчэйн сүлжээнд баталгаажаагүй байна.')
  })
  let pdfString = ArrayBufferToString(pdfArrayBuffer)
  return await _validateInner(metadata, pdfString, pdfJSMetadata)
}

async function _validateInner(metadata, pdfString) {
  let PDFHash = await extractHash(pdfString);
  let isValid = true;
  let result = {
    state: '',
    metadata: metadata,
    cert: {},
    issuer: {},
  }
  try {
    const certification = await requestCertificationByHash(PDFHash);
    if (certification.hash !== PDFHash) {
      isValid = false;
    } else {
      if (certification.isRevoked) {
        result.state = 'REVOKED';
      } else {
        const expireDate = parseInt(certification.expiredAt) * 1000 || 0;
        const now = new Date().getTime();
        console.log(now, expireDate);
        if (expireDate !== 0 && now > expireDate) {
          result.state = 'EXPIRED';
        } else {
          result.state = 'ISSUED';
        }
      }
      result.cert = certification;
      try {
        result.issuer = await requestIssuerByAddress(certification.issuer);;
      } catch (e) {
        console.error(e);
      }
    }
  } catch (e) {
    console.error(e)
    throw new Error('Баталгаажуулах явцад алдаа гарлаа.')
  }
  if (!isValid) {
    throw new Error('Блокчэйн сүлжээнд баталгаажаагүй байна.')
  }
  return result;
}
