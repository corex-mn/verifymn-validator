import React, { useState } from "react";
import certifyLogo from '../../assets/images/certifyLogo.svg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={"bg-white border-gray-200 pt-6 pb-4"} id={"home-navbar"}>
            <div className={"w-screen px-8 flex flex-wrap justify-between items-center"}>
            <a href={"https://dashboard.certify.mn/login"} target={"_blank"} className={"flex items-center"}>
                <img src={certifyLogo} className={"mr-3 h-10 md:h-14"} alt={"Certify Logo"}/>
            </a>

            <button onClick={() => setIsOpen(!isOpen)} data-collapse-toggle={"mobile-menu"} type="button"
                    className={"inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"}
                    aria-controls="mobile-menu" aria-expanded="false">
                <span className={"sr-only"}>Open main menu</span>

                {!isOpen ? (
                    <svg className={"w-6 h-6"} fill={"currentColor"} viewBox={"0 0 20 20"} xmlns={"http://www.w3.org/2000/svg"}>
                        <path fillRule={"evenodd"}
                              d={"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"}
                              clipRule={"evenodd"}></path>
                    </svg>
                ):(
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 x-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}

            </button>

                <div className={ "md:block md:w-auto" + (isOpen ? " flex w-full burger-menu-wrapper" : " hidden")}  id={"mobile-menu"}>
                <ul className={"flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"}>
                    {/*<li>*/}
                    {/*    <a href="#"*/}
                    {/*       className={"uppercase block py-3 text-white font-medium rounded md:bg-transparent"}*/}
                    {/*       aria-current="page">Бидний тухай</a>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <a href="#"*/}
                    {/*       className={"uppercase block lg:px-8 md:px-0 py-3 text-white font-medium rounded md:bg-transparent"}*/}
                    {/*       aria-current="page">Байгууллагууд</a>*/}
                    {/*</li>*/}
                    <li>
                        <a href={'https://dashboard.certify.mn/login'} className={"signing text-white block px-8 py-3 rounded-none uppercase" + (isOpen ? " sign-btn-block left-1/2 -translate-x-1/2" : " ")}>Нэвтрэх</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)
}

export default Navbar;
