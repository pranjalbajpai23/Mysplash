/* eslint-disable react/prop-types */
import { IoHomeSharp } from "react-icons/io5";
import { SiAdobeillustrator } from "react-icons/si";
import { TbPhotoFilled } from "react-icons/tb";
import { PiPenNibFill } from "react-icons/pi";
const SubNav=({active,setActive})=>{
    const filters = [
        { name: 'Home', isActive: true, nonActive: <IoHomeSharp size={"1rem"} />, active: <IoHomeSharp size={"1rem"} style={{ filter: "invert(60%) sepia(49%) saturate(463%) hue-rotate(87deg) brightness(102%) contrast(92%)" }} /> },
        { name: 'Illustrator', isActive: false, nonActive: <SiAdobeillustrator size={"1rem"} />, active: <SiAdobeillustrator size={"1rem"} style={{ filter: "invert(60%) sepia(49%) saturate(463%) hue-rotate(87deg) brightness(102%) contrast(92%)" }} /> },
        { name: 'Photos', isActive: false, nonActive: <TbPhotoFilled size={"1rem"} />, active: <TbPhotoFilled size={"1rem"} style={{ filter: "invert(60%) sepia(49%) saturate(463%) hue-rotate(87deg) brightness(102%) contrast(92%)" }} /> },
        { name: 'Vectors', isActive: false, nonActive: <PiPenNibFill size={"1rem"} />, active: <PiPenNibFill size={"1rem"} style={{ filter: "invert(60%) sepia(49%) saturate(463%) hue-rotate(87deg) brightness(102%) contrast(92%)" }} /> },
    ]




    return <>
        <div className="flex place-content-center pt-6">
            <ul className="flex flex-row w-3/6 justify-evenly">
                {
                    filters.map((items) => {
                        return <li key={items.name} className={`rounded-full p-1 ${active == items.name && "bg-slate-100"} flex justify-evenly w-[8rem] items-center px-1`} onClick={() => setActive(items.name)}>
                            {active == items.name ? items.active : items.nonActive}
                            {items.name}
                        </li>
                    })
                }

            </ul>
        </div>

    </>
}
export default SubNav;