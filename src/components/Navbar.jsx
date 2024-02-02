/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { IoSearchSharp } from "react-icons/io5";
import { FaUnsplash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { homeItemActions } from '../store/homeItemSlice';
import { createApi } from 'unsplash-js';
import { FaUser } from "react-icons/fa";
import supabase from '../SupabaseConfig/SupabaseClient';
import { sessionAction } from '../store/sessionStatus';


const Navbar = ()=>{
    const sessionStatus=useSelector(state=>state.sessionStatus);
    const dispatch=useDispatch();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [localSearch, setLocalSearch] = useState('');
    const handelChange = (event) => {
        setLocalSearch(event.target.value);
    }
    const api = createApi({
        accessKey: "xC5ekPvQKksgPqRyibj1mgvwdd3MP8UTe5gUNkZ1F0M"
    });
    const handleSearch = () => {
        api.search
            .getPhotos({ query: `${localSearch != '' && localSearch}`, per_page: 25 }).
            then((res) => {
                console.log(res.response.results);
                dispatch(homeItemActions.addHomeItem(res.response.results));
            })
        if (mobileMenuOpen == true) {
            setMobileMenuOpen(false);
        }
    }
    const handelSignOut=async()=>{
        const { error } = await supabase.auth.signOut()
        if(error) {
           console.log(error);         
        }
        localStorage.clear();
        let user = JSON.parse(localStorage.getItem('user'));
        dispatch(sessionAction.setSessionFalse());
        console.log("session out",user);
    }
    console.log("session in navbar",sessionStatus);
    return <>
        <header className="absolute inset-x-0 top-0 z-30 backdrop-blur-xl">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">MySplash</span>
                            <FaUnsplash className="h-8 w-auto" style={{ rotate: "180deg" }}  color={"white"}/>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6 brightness-7" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <div className="ab lb lx yz flex w-[60rem] bg-gray-100 item-center  justify-between p-2 rounded-md shadow-md">
                            <input type="text" name="search" id="search" className="lu tn adu afa arp atx axu bbm bbs bbw bce bgc bnd bne bnq cia cic w-11/12 bg-gray-100" placeholder='Search' onChange={handelChange} />
                            <IoSearchSharp className='size-5' onClick={handleSearch} />
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        
                        {
                        !sessionStatus ? <Link to={"/SignIn"} href="" className="text-sm font-semibold leading-6 text-white">SignIn <span aria-hidden="true">&rarr;</span></Link> : <div className='flex items-center'> <Link href="" className="text-sm font-semibold leading-6 text-white pr-2 hover:border-b-2 border-black mr-4" onClick={handelSignOut}>signOut</Link> <Link to='/User' className='hover:border-b-2 border-black pb-2'><FaUser color={"white"} /> </Link> </div>
                        }
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5"> 2323

                                <span className="sr-only">MySplash</span>
                                <FaUnsplash className="h-8 w-auto" style={{ rotate: "180deg" }} />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <div className="ab lb lx yz flex w-auto bg-gray-100 item-center  justify-between p-2 rounded-md shadow-md">
                                        <input type="text" name="search" id="search" className="lu tn adu afa arp atx axu bbm bbs bbw bce bgc bnd bne bnq cia cic w-2/3 bg-gray-100" placeholder='Search' onChange={handelChange} />
                                        <IoSearchSharp className='size-5' onClick={handleSearch} />
                                    </div>

                                </div>
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white-900 hover:bg-gray-50 "
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>

    </>
}
export default Navbar;