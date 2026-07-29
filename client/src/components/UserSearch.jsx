import { useState, useEffect, useRef } from "react";
import API from "../api/axios";


function UserSearch(){


    const [search,setSearch] = useState("");

    const [users,setUsers] = useState([]);

    const [following,setFollowing] = useState([]);

    const [currentUser,setCurrentUser] = useState(null);
     const searchRef = useRef(null);




    // Get current user's following list

    const fetchFollowing = async()=>{

        try{


            const response = await API.get(
                "/users/profile"
            );


            setCurrentUser(
                response.data.user._id
            );


            const followingIds =
            response.data.user.following.map(
                user=>user._id
            );


            setFollowing(followingIds);



        }
        catch(error){

            console.log(error);

        }

    };





    useEffect(()=>{


        fetchFollowing();


    },[]);
    useEffect(()=>{

    const handleClickOutside = (event)=>{

        if(
            searchRef.current &&
            !searchRef.current.contains(event.target)
        ){

            setUsers([]);

        }

    };


    document.addEventListener(
        "mousedown",
        handleClickOutside
    );


    return ()=>{

        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );

    };


},[]);






    const handleSearch = async(e)=>{


        const value = e.target.value;


        setSearch(value);




        if(value.trim()===""){

            setUsers([]);

            return;

        }





        try{


            const response = await API.get(

                `/users/search?search=${value}`

            );



            // remove current user from results

            const filteredUsers =
            response.data.filter(

                user=>user._id !== currentUser

            );



            setUsers(filteredUsers);



        }
        catch(error){

            console.log(error);

        }


    };
    const handleFollow = async(id)=>{


        try{


            if(following.includes(id)){



                await API.put(

                    `/users/unfollow/${id}`

                );



                setFollowing(prev=>

                    prev.filter(
                        userId=>userId!==id
                    )

                );



            }

            else{



                await API.put(

                    `/users/follow/${id}`

                );



                setFollowing(prev=>[

                    ...prev,

                    id

                ]);



            }



        }
        catch(error){


            console.log(

                error.response?.data || error

            );


        }


    };









    return(


        <div className="relative" ref={searchRef}>





            <input
            onChange={(e)=>{

    setSearch(e.target.value);

    if(e.target.value===""){
        setUsers([]);
    }

}}


                value={search}


                onChange={handleSearch}


                placeholder="Search users..."


                className="
                w-72
                px-4
                py-2
                rounded-full
                border
                outline-none
                focus:ring-2
                focus:ring-blue-500
                "


            />







            {
                users.length > 0 &&


                <div


                className="
                absolute
                top-12
                left-0
                bg-white
                shadow-xl
                rounded-xl
                w-72
                p-3
                z-50
                "


                >






                {

                    users.map(user=>(



                        <div

                        key={user._id}

                        className="
                        flex
                        justify-between
                        items-center
                        p-3
                        hover:bg-gray-100
                        rounded-lg
                        "

                        >





                            <div>



                                <h3 className="
                                font-semibold
                                ">

                                    {user.name}

                                </h3>




                                <p className="
                                text-sm
                                text-gray-500
                                ">

                                    {user.email}

                                </p>



                            </div>








                            <button



                            onClick={()=>
                                handleFollow(user._id)
                            }



                            className={

                            following.includes(user._id)

                            ?

                            `
                            bg-gray-300
                            text-gray-800
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            `


                            :


                            `
                            bg-blue-600
                            text-white
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            hover:bg-blue-700
                            `

                            }



                            >




                            {

                            following.includes(user._id)

                            ?

                            "Following"

                            :

                            "Follow"


                            }




                            </button>






                        </div>



                    ))


                }







                </div>



            }







        </div>


    );

}



export default UserSearch;