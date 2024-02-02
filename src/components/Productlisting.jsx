import SubNav from "./SubNav";
import Products from "./Products";
import { useState } from "react";
const Productlisting=()=>{

    const [active, setActive] = useState('Home');
    return <>
        <SubNav active={active} setActive={setActive}/>
        <Products active={active} />
        </>
}
export default Productlisting;