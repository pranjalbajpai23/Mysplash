import { useState } from "react";
import supabase from "../SupabaseConfig/SupabaseClient";
import { FaUnsplash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { sessionAction } from "../store/sessionStatus";
import { useDispatch } from "react-redux";
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [userName,setUserName]=useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userNameHandler=async(id)=>{
        const { data, error } = await supabase
                                .from('profiles')
                                .update({username: userName})
                                .eq('id',id)
                                .select();
        if (error) {
            console.log(error);
        }
        if (data) {
            console.log("User Created Sucessfully");
            dispatch(sessionAction.setSessionTrue());
            navigate('/');
        }
    }
    const signUpNewUser = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: pass,
        })

        if (error) {
            console.log(error);
        }
        if (data) {
            supabase.auth.setSession(
                data.session.access_token,
                data.session.refresh_token
            )
            userNameHandler(data.user.id);
        }
    }


    return <>
        <div className="flex flex-col justify-center items-center w-3/5 h-dvh m-auto ">
            <div className="flex flex-col justify-evenly items-center rounded-md shadow-2xl w-2/5 h-2/5">
                <FaUnsplash className="" style={{ rotate: "180deg" }} size={64} />
                <div className="flex flex-col justify-start mt-2 border-b-2 border-black  bg-white ">
                    <input className="pb-2 focus:bg-slate-100 " type="email" name="" id="" onChange={(e) => setUserName(e.target.value)} placeholder="User Name" />
                </div>
                <div className="flex flex-col justify-start mt-2 border-b-2 border-black  bg-white ">
                    <input className="pb-2 focus:bg-slate-100 " type="email" name="" id="" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="flex flex-col justify-start mt-2 border-b-2 border-black  bg-white">
                    <input className="pb-2 focus:bg-slate-100" type="email" name="" id="" onChange={(e) => setPass(e.target.value)} placeholder="Password Minimum 6 Length" />
                </div>
                <button className="border-2 border-black shadow-xl pl-2 pr-2 bg-black text-white w-2/5 rounded-md" onClick={signUpNewUser}>Submit</button>
                <div className="flex justify-between w-full pl-2 pr-2">
                    <Link to='/SignIn' className="flex flex-row items-center hover:border-b-2 border-black">SignIn <IoIosArrowRoundForward size={28} /></Link>
                    <Link className="hover:border-b-2 border-black">Need Help ?</Link>
                </div>
            </div>
        </div>
    </>

}
export default SignUp;