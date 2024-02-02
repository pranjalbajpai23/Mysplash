import { useEffect, useState } from "react";
import supabase from "../SupabaseConfig/SupabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../store/favoriteSlice";
import Product from "../components/Product";
import { Link } from "react-router-dom";
const Profile=()=>{
    const [foundData,setFound]=useState(false);
    const [userName,setUserName]=useState('');
    const homeItem = useSelector((item) => item.homeItem);
    const favorite=useSelector((item)=>item.favorite);
    const [filtered,setFiltered]=useState([]);
    const dispatch=useDispatch();
    useEffect(()=>{

        const filtering = () => {
            const list = homeItem.filter(item => {
                const idx = favorite.indexOf(item.id);
                return idx > 0; // Change to >= to include 0
            });
            setFiltered(list);
        };

        const getUserLogin = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    setFound(false);
                    console.log(error);
                }
                if (data) {
                    setFound(true);
                    console.log("Success userId");
                    return data.session.user.id;
                }
            } catch (error) {
                console.error(error);
            }
        };

        const getUserFavorite = async () => {
            try {
                const usrId = await getUserLogin(); // Wait for the promise to resolve
                const { data, error } = await supabase
                    .from('profiles')
                    .select()
                    .eq('id', usrId)
                    .single();

                if (error) {
                    setFound(false);
                    console.log(error);
                }
                if (data) {
                    setFound(true);
                    dispatch(favoriteActions.addFavorite(data.favorite));
                    setUserName(data.username);
                    console.log(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getUserFavorite();
        filtering();

    }, [])


    return <>
        <div className="flex items-center justify-between px-3"> 
            <div className="font-sans text-2xl font-semibold">Hello {userName},<span className="font-sans font-medium"> your Favorite Images</span></div>
            <div><Link to='/'>Back to home</Link> </div>
        </div>
        <div className="font-sans text-sm text-rose-600 px-3">*Note- not all favorite are fetched to save api call</div>
        <div className="masonry sm:masonry-sm md:masonry-md p-4">
        {
            // { ProId,user,urls,likes,date,color,download,tags}
            foundData?filtered.map(item=>{
                return <Product key={item.id} ProId={item.id} user={item.user} urls={item.urls} likes={item.likes} date={item.created_at} color={item.color} download={JSON.stringify(item.links.download)} tags={item.tags} fav={true}/>
            }):<h1>fail</h1>
        }
        </div>
    </>
}
export default Profile;