import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import {hot} from 'react-hot-loader';
import CoreValidator from './CoreValidator';

import './assets/css/main.css';
import './scss/App.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Modal from './components/Modal';

class App extends React.Component {
  state = {
    loading: false,
    preError: null,
    result: null,
    error: null,
    modalOpen: false,
    pdf: null
  };

  validateJS = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({pdfArrayBuffer: e.target.result, modalOpen: true});
    };

    reader.readAsArrayBuffer(file);
  }

  processPDF = (acceptedFiles) => {
    if (!acceptedFiles.length) {
      const preError = 'Not a valid PDF file';
      console.error(preError);
      this.setState({preError});
      return;
    }
    if (acceptedFiles.length > 1) {
      const preError = 'You can only validate one file at a time';
      console.error(preError);
      this.setState({preError});
      return;
    }

    this.setState({loading: true, preError: null});

    this.validateJS(acceptedFiles[0]);
  }

  cleanUp = () => {
    this.setState({
      result: null,
      error: null,
      loading: false,
      pdf: null
    });
  }

  closeModal = () => {
    this.setState({modalOpen: false});
    this.cleanUp();
  }

  render() {
    return (
        <div className="App flex flex-col justify-between h-screen">
          <Navbar/>
          <div className={'container mx-auto flex justify-center'} id={'main-container'}>
              <div className={"main-content px-6 sm:px-0"}>
                  <h1 className={'logo-text text-white text-center text-[50px] sm:text-[80px] font-bold mb-1'}>Verify</h1>
                  <h4 className={'logo-sub-text text-[16px] sm:text-[24px] text-white text-center font-normal mb-14'}>Блокчэйн сүлжээнд баталгаажуул.</h4>
                  <Dropzone className={'drag-and-drop cursor-pointer'} onDrop={this.processPDF} multiple={false} accept="application/pdf">
                    {({getRootProps, getInputProps, isDragActive}) => (
                        <div {...getRootProps()} className={classNames('dropzone', {'hover': isDragActive})}>
                          <input id='pdf_dropzone' {...getInputProps()} />
                          {
                            isDragActive ?
                                <div id='pdf_dropzone' className={'text-xs sm:text-sm font-normal uppercase'}>Файл оруулах</div> :
                                <div id='pdf_dropzone' className={'text-xs sm:text-sm font-normal uppercase'}>
                                  <span className={'dropzone-text self-center mx-4'}>Файл оруулах</span>
                                </div>
                          }
                        </div>
                    )}
                  </Dropzone>
              </div>
          </div>

          <Footer/>

          <Modal
              isOpen={this.state.modalOpen}
              closeModal={this.closeModal}
              body={
                <CoreValidator
                    pdfArrayBuffer={this.state.pdfArrayBuffer}
                    contactName={this.props.contactName}
                    contactEmail={this.props.contactEmail}
                    organization={this.props.organization}
                    docType={this.props.docType}
                    blockchainServices={this.props.blockchainServices}
                    closeFunction={this.closeModal}
                />
              }
          />
        </div>
    );
  }
}

App.defaultProps = {
  blockchainServices: {
    'corex': {
      requiredSuccesses: 1,
      services: [{
        name: process.env.REACT_APP_SERVICE_NAME,
        url: process.env.REACT_APP_SERVICE_URI
      }]
    }
  }
};

export default hot(module)(App);
