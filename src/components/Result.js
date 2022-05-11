import React from 'react'
import classNames from 'classnames'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {formatDate} from './Datetime'

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

const createLink = (txid, type, chain, testnet) => {
  let url;
  if (chain.toString().toLowerCase() === 'corex' && !testnet) {
    url = `https://explorer.corexchain.io/${type}/${txid}`;
  } else if (chain.toString().toLowerCase() === 'corex' && testnet) {
    url = `https://explorer-testnet.corexchain.io/${type}/${txid}`;
  }
  return url;
}

const truncateAddress = (address, len = 7) => {
  if (!address || !address.length) {
    return '';
  }
  return `${address.substring(0, len)}...${address.substring(address.length - len, address.length)}`;
}

const IdentityObject = ({address, issuer, txid, timestamp, chain, testnet, isRevoked, revokedAt}) => {
  return (
      <div style={{marginBottom: '1.5rem'}}>
        {isRevoked && <div className="bc-info-wrapper">
          <h3>Хүчингүй болгосон мэдээлэл</h3>
          <div className="bc-info-item">
            <label>Хүчингүй болгосон огноо</label>
            <div>{formatDate(revokedAt * 1000)}</div>
          </div>
        </div>}
        <div className="bc-info-wrapper">
          <h3>Баталгаажуулсан мэдээлэл</h3>
          <div className="bc-info-item">
            <label>Баталгаажуулагчийн нэр</label>
            <div>{issuer}</div>
          </div>
          <div className="bc-info-item">
            <label>Блокчэйн нэр</label>
            <div>{capitalize(chain)}</div>
          </div>
          <div className="bc-info-item">
            <label>Баталгаажуулагч ID</label>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a title={address} href={createLink(address, 'address', chain, testnet)} target="_blank" rel="noopener noreferrer">{truncateAddress(address, 12)}</a>
          </div>
          <div className="bc-info-item">
            <label>Гүйлгээний ID</label>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a title={txid} href={createLink(txid, 'transactions', chain, testnet)} target="_blank" rel="noopener noreferrer">{truncateAddress(txid, 12)}</a>
          </div>
          <div className="bc-info-item">
            <label>Баталгаажсан огноо</label>
            <div>{formatDate(timestamp * 1000)}</div>
          </div>
        </div>
      </div>
  )
};

const ErrorMsg = ({customText, docType}) => (
    <div className="p-3">
      <p>
        <FontAwesomeIcon icon={faInfoCircle} className="text-primary"/> Та блокчэйн сүлжээнд баталгаажсан PDF файл
        оруулна уу. *Хувилбар болон засварласан файл хүчингүйд тооцогдоно.
      </p>
      {customText.contactEmail && (
          <>
            <br/>
          </>
      )}
    </div>
)

const Result = ({docType, result, error, customText}) => {
  return (
      <div>
        {error && (
            <>
              <div id="result_invalid" className="bc-alert bc-alert-danger bc-text-center">
                <FontAwesomeIcon icon={faTimesCircle}/> {error.detail}
              </div>
              <ErrorMsg customText={customText} docType={docType}/>
            </>
        )}
        {result && (
            <>
              {result.state === 'ISSUED' ? (
                  <>
                    <div
                        id="result_valid"
                        className={classNames('bc-alert state bc-text-center bc-alert-success')}
                    >
                      Хүчинтэй
                    </div>
                    <IdentityObject
                        address={result.cert.issuer}
                        issuer={result.issuer.name || 'Unkown'}
                        txid={result.cert.txid}
                        timestamp={result.cert.createdAt}
                        chain={'COREX'}
                        testnet={result.testnet}
                        isRevoked={result.cert.isRevoked}
                        revokedAt={result.cert.revokedAt}
                    />
                  </>
              ) : (
                  <>
                    <div id="result_revoked_expired" className="bc-alert state bc-alert-danger bc-text-center">
                      Хүчингүй
                    </div>
                    <IdentityObject
                        address={result.cert.issuer}
                        issuer={result.issuer.name || 'Unkown'}
                        txid={result.cert.txid}
                        timestamp={result.cert.createdAt}
                        chain={'COREX'}
                        testnet={result.testnet}
                        isRevoked={result.cert.isRevoked}
                        revokedAt={result.cert.revokedAt}
                    />
                  </>
              )}
            </>)}
      </div>
  )
}

export default Result
