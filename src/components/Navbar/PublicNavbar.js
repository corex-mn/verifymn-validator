import React from 'react';
import './navbar.scss';
import WhiteLabelLogo from '../../assets/images/logo.svg';

const PublicNavbar = () => {
  return (
      <div className={'navbar'}>
        <div className={'logo'}>
          {/*  энэ img дээр дарвал home руугаа үсэрдэг байх ёстой :P */}
          <img src={WhiteLabelLogo} alt={'aaruul_logo'} onClick={() => {
            window.open('https://dashboard.certify.mn/login')
          }}/>
        </div>
        <div className={'nav-links'}>
          <li className={'nav-item'} id={'login'}>
            {/* Энэ a дээр дарвал login руу үсэрдэг байх ёстой */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href={'https://dashboard.certify.mn/login'}>
              <i className={'fa fa-circle-user'}/>
              НЭВТРЭХ
            </a>
          </li>
        </div>
      </div>
  )
}

export default PublicNavbar;
