import React, {useState} from "react";
import verifyLogo from '../../assets/images/verifylogo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className={"bg-white border-gray-200 py-4 md:py-8"} id={"home-navbar"}>
            <div className={"w-screen px-2 sm:px-16 flex flex-wrap justify-end items-end"}>
                <button onClick={() => setIsOpen(!isOpen)} data-collapse-toggle={"mobile-menu"} type="button"
                        className={"x-btn inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-transparent focus:outline-none"}
                        aria-controls="mobile-menu" aria-expanded="false">
                    <span className={"sr-only"}>Open main menu</span>

                    {!isOpen ? (
                        <svg className={"w-6 h-6"} fill={"currentColor"} viewBox={"0 0 20 20"}
                             xmlns={"http://www.w3.org/2000/svg"}>
                            <path fillRule={"evenodd"}
                                  d={"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"}
                                  clipRule={"evenodd"}></path>
                        </svg>
                    ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 x-icon" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                    )}
                </button>

                <div className={"md:block md:w-auto" + (isOpen ? " flex w-full burger-menu-wrapper" : " hidden")}
                     id={"mobile-menu"}>
                    <ul className={"flex flex-col mt-14 md:flex-row ml-9 md:mt-0"}>
                        <li>
                            <a href={"https://dashboard.certify.mn/login"} target={"_blank"}
                               className={"mobile-logo md:hidden"}>
                                <img src={verifyLogo} className={"mr-3 h-6"} alt={"Verify Logo"}/>
                            </a>
                        </li>
                        {/*<li>*/}
                        {/*    <a href="#"*/}
                        {/*       className={"block text-white font-normal px-4 py-2.5 mr-8"}*/}
                        {/*       aria-current="page">Бидний тухай</a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <a href="#"*/}
                        {/*       className={"block text-white font-normal px-4 py-2.5 mr-9"}*/}
                        {/*       aria-current="page">Байгууллагууд</a>*/}
                        {/*</li>*/}
                        <li>
                            <a href={'https://dashboard.certify.mn/login'}
                               className={"signing text-white block px-4 py-2.5" + (isOpen ? " sign-btn-block left-1/2 -translate-x-1/2" : " ")}>Нэвтрэх</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
