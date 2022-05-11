const defaultResponse = {
  issuer: {
    name: "",
    address: ""
  },
  info: {
    name: "",
    desc: "",
    cerNum: "",
    additionalInfo: ""
  },
  version: "",
  blockchain: {
    network: "",
    smartContractAddress: ""
  }
}

const getNetwork = (proof, address) => {
  // currently only a single anchor is allowed at a time
  const anchorType = proof.anchors[0].type

  let chain, testnet;
  if (anchorType === 'CorexDataTest') {
    chain = 'corex'
    testnet = true
  } else if (anchorType === 'CorexDataMain') {
    chain = 'corex'
    testnet = false
  } else {
    throw new Error('Ямар блокчэйн дээр хийгдсэн гүйлгээ болохыг тогтоож чадсангүй.')
  }

  return {chain, testnet}
}


const extractMetadata = async pdfInfo => {
  // Extracts the relevant metadata of the vPDF from
  // the PDFJS parsed metadata
  const pdfCustomMetadata = pdfInfo.info.Custom
  const verifymn = pdfCustomMetadata.verifymn;
  if (!verifymn) {
    return defaultResponse;
  }
  return JSON.parse(verifymn);
}

export default extractMetadata
