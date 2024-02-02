import { useEffect, useState } from 'react'
import { createApi } from "unsplash-js";

const Mainpage=()=>{

        const [bgImg, setbgImg] = useState('');

        useEffect(()=>{
            // const userSessionData=async()=>{
            //     const { data, error } = await supabase.auth.getSession();
            //     if(error) {
            //         console.log(error);
            //     }
            //     if(data){
            //         const user={
            //             id:data.session.user.id,
            //             access_token:data.session.access_token
            //         }
            //         localStorage.setItem('user', JSON.stringify(user));
            //         console.log(data)
            //     }
            // }
            // userSessionData();
            const api = createApi({
                accessKey: "xC5ekPvQKksgPqRyibj1mgvwdd3MP8UTe5gUNkZ1F0M"
            });

            api.photos.getRandom({ query: "Mountain Majesty dark", count: 1, orientation: "landscape" })
                      .then((res) => setbgImg(JSON.stringify(res.response[0].urls.full)));
           
            
        },[]);
        
        
        return (
            <div className="bg-white">
                <div className={`relative isolate px-6 pt-14 lg:px-8`} style={{ backgroundImage: `url(${bgImg})`, backgroundSize: " 100 auto", backgroundRepeat: " no-repeat", backgroundPosition: "center", backgroundColor:"hsla(0, 0%, 81%, 0.9)"}}> 
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-white hover:ring-gray-900/20 text-white">
                                Get a random stock image.{' '}
                                <a href="#" className="font-semibold text-[]">
                                    <span className="absolute inset-0 text-white" aria-hidden="true" />
                                    Genrate now <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div className="text-center ">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-white">
                                Welcome to MySplash
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 text-white">
                                Over 4.3 million+ high quality stock images, videos and music shared by our talented community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
}
export default Mainpage;
