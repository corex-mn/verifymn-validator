import React from 'react';

const Footer = () => {
  return (
    <nav className={""} id={'footer'}>
        <div className={"w-screen px-8 sm:px-16 py-5"}>
            {/*<ul className={"flex justify-end mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"}>*/}
                <ul className={"flex justify-end mt-4"}>
                <li>
                    <a href="#"
                       className={"block py-2 text-white text-xs sm:text-sm font-normal"}
                       aria-current="page">Нууцлалын бодлого</a>
                </li>
                <li>
                    <a href="#"
                       className={"block py-2 pl-4 sm:pl-9 text-white text-xs sm:text-sm font-normal"}
                       aria-current="page">Powered by COREXCHAIN</a>
                </li>
            </ul>
        </div>
    </nav>
)
}

export default Footer;
