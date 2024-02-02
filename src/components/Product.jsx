import { useState } from "react";
import Modal from "react-modal";
import { MdDownload } from "react-icons/md";
import { IoClose, IoHeart, IoHeartOutline } from "react-icons/io5";
import supabase from "../SupabaseConfig/SupabaseClient";
/* eslint-disable react/prop-types */
const Product = ({ ProId,user,urls,likes,date,color,download,tags,fav})=>{

    const [modalIsOpen, setIsOpen] =useState(false);
    const [favorite,setFavorite]=useState(false);
    Modal.setAppElement("#popUpModal");
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    const getSessionUserId=async()=>{
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.log(error);
            }
            if (data) {
                return data.session.user.id;
            }
    }   
    const appendFavorite=async(id,value)=>{
        const { data, error } = await supabase
            .rpc('append_to_favorite', { p_id: id, p_value: value })
            .select()
        if (error) {
            console.log(error);
        }
        if (data) {
            console.log(data);
        }
    }
    const handelFavroite=async(value)=>{
        if(!favorite){
            const id= getSessionUserId();
            id.then(id => { appendFavorite(id, value) });
            
            
        }
        setFavorite(true);
            
    }




    return<>
        <div className="group/item  p-4" onClick={openModal} >
            <img className="rounded-lg  break-inside group/edit hover:brightness-75"  src={urls.regular} alt="" />
            <a className="relative group/edit invisible  group-hover/item:visible text-white bottom-10 left-5" href={`https://unsplash.com/@${user.username}`}> {user.name}</a>
        </div>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="flex flex-col m-auto bottom-auto right-auto  w-[90%] h-[90vh] bg-white translate-y-8 transform-gp p-4 border-none rounded-md z-50" 
            autoFocus={false}
        >
            <div className="flex justify-between p-2">
                <div className="flex items-center pb-4">
                    <img className="rounded-full" src={`${user.profile_image.small}`} alt="" />
                    <a className="text-black font-sans p-1" href={`https://unsplash.com/@${user.username}`}>  {user.name}</a>
                </div>
                <button className="font-sans" onClick={closeModal}><IoClose size={28}/></button>
            </div>
            <div className="m-auto bottom-auto right-auto w-[68vw] h-[68vh] bg-slate-100" style={{ backgroundImage: `url(${urls.regular})`,backgroundPosition:"center",backgroundSize:"auto 100%", backgroundRepeat:"no-repeat"}}>
            </div>
            <div className="flex justify-between m-auto bottom-auto right-auto w-[68vw] flex-wrap pt-2">
                <div className="flex justify-between w-1/3  flex-wrap"> 
                    <div className="text-zinc-400">
                        Likes
                        <p className="text-zinc-700">{likes}</p>
                    </div>
                    <div className="text-zinc-400">
                        Posted on
                        <p className="text-zinc-700">{date}</p>
                    </div>
                    <div className="text-zinc-400">
                        Color
                        <p className="text-zinc-700">{color}</p>
                    </div>
                </div>
                <div className="lg:flex items-center justify-end  md:flex-column"> 
                    <div className="flex items-center p-1 mr-2" onClick={()=>{handelFavroite(ProId)}}>
                    {
                        (favorite|| fav)  ?<IoHeart color={"red"} size={32}/> : <IoHeartOutline size={32}/>
                    }     
                </div> 
                    <a className=" flex items-center font-sans rounded-md border-solid border-2 border-slate-500 p-1" href={`${download}`} target="_blank" rel="noreferrer" download="download.jpeg"><MdDownload size={24}/> Download</a>
                </div>
            </div>
            <div className="flex mt-4 m-auto bottom-auto right-auto w-[68vw]">
                {  
                    tags.map((item)=>{
                        return <div key={item.title} className=" flex items-center font-sans rounded-md  bg-gray-100 p-1 mr-2 font-sans text-stone-700 hover:bg-gray-200" >{item.title}</div>;
                    })
                }

            </div>
        </Modal>
    </>
}
export default Product;