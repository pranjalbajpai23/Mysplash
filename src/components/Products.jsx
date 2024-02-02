/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createApi } from "unsplash-js";
import { homeItemActions } from "../store/homeItemSlice";
import Product from "./Product";

const Products=({active})=>{
    const api = createApi({
        accessKey: "xC5ekPvQKksgPqRyibj1mgvwdd3MP8UTe5gUNkZ1F0M"
    });
    const dispatch=useDispatch();
    const homeItem=useSelector((item)=>item.homeItem);
    useEffect(()=>{
        api.search
        .getPhotos({query:`${active=="Home"?"/Photos":active}`,per_page:25}).
        then((res) => {
            console.log(res.response.results);
            dispatch(homeItemActions.addHomeItem(res.response.results));
        })

    },[active]);
    

    return <>
        <div className="masonry sm:masonry-sm md:masonry-md p-4">
            {
                homeItem.map(item=>{
                    return <Product key={item.id} ProId={item.id} user={item.user} urls={item.urls} likes={item.likes} date={item.created_at} color={item.color} download={JSON.stringify(item.links.download)} tags={item.tags} fav={false}/>
                })
            }

        </div>

    </>
}
export default Products;