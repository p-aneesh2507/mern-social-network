import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import API from "../api/axios";

import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import { motion } from "framer-motion";

function PostCard({post, refreshPosts}){


    const [comments,setComments] = useState([]);
    const [liked,setLiked] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

const currentUser = JSON.parse(localStorage.getItem("user"));
const [likesCount,setLikesCount] = useState(
    post.likes?.length || 0
);


    const fetchComments = async()=>{

        try{

            const response = await API.get(
                `/comments/${post._id}`
            );


            setComments(response.data);


        }
        catch(error){

            console.log(error);

        }

    };




    const handleLike = async()=>{


    try{


        if(liked){


            await API.put(
                `/posts/${post._id}/unlike`
            );


            setLiked(false);

            setLikesCount(
                likesCount-1
            );


        }

        else{

    await API.put(`/posts/${post._id}/like`);

    setLiked(true);

    setLikesCount(
        likesCount + 1
    );

}


    }
    catch(error){

        console.log(error);

    }


};

const handleDelete = async () => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {

        await API.delete(`/posts/${post._id}`);

        alert("Post deleted successfully");

        refreshPosts();

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Unable to delete post"
        );

    }

};

    useEffect(()=>{

    fetchComments();


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    if(user && post.likes?.includes(user._id)){

        setLiked(true);

    }


},[]);
 
return (

<motion.div
initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.4
}}
className="
bg-white
rounded-3xl
shadow-lg
overflow-hidden
transition
hover:shadow-2xl
duration-300
"
>

{/* Header */}

<div className="p-6">

<div className="flex justify-between">

<div className="flex gap-4">

<div
className="
w-14
h-14
rounded-full
bg-gradient-to-r
from-blue-500
to-purple-600
flex
items-center
justify-center
text-white
font-bold
text-2xl
"
>

{post.user?.name?.charAt(0).toUpperCase()}

</div>

<div>

<h2 className="font-bold text-xl">

{post.user?.name}

</h2>

<p className="text-gray-500 text-sm">

{post.user?.email || ""}

</p>

<p className="text-gray-400 text-xs">

{new Date(post.createdAt).toLocaleString()}

</p>

</div>

</div>

<div className="relative">

    <button
        onClick={() => setShowMenu(!showMenu)}
        className="
        text-2xl
        text-gray-500
        hover:text-black
        "
    >
        ⋮
    </button>

    {
        showMenu &&
        currentUser &&
        (
            currentUser._id === post.user?._id ||
            currentUser.id === post.user?._id
        ) && (

            <div
                className="
                absolute
                right-0
                mt-2
                w-40
                bg-white
                rounded-lg
                shadow-lg
                border
                z-50
                "
            >

                <button
                    onClick={handleDelete}
                    className="
                    flex
                    items-center
                    gap-2
                    w-full
                    px-4
                    py-3
                    text-red-600
                    hover:bg-red-50
                    "
                >

                    <FaTrash />

                    Delete Post

                </button>

            </div>

        )
    }

</div>

</div>

{/* Content */}

<p
className="
mt-6
text-lg
leading-relaxed
text-gray-700
"
>

{post.content}

</p>
{
post.image && (

<img

src={`http://localhost:5000/${post.image}`}

className="
w-full
rounded-2xl
mt-5
max-h-96
object-cover
"

/>

)
}
</div>

{/* Footer */}

<div
className="
border-t
px-6
py-4
flex
justify-around
"
>

<button
onClick={handleLike}
className="
flex
items-center
gap-2
flex
items-center
gap-2
px-4
py-2
rounded-full
hover:bg-red-50
transition
duration-300
"
>

{liked ? "❤️" : "🤍"}

{likesCount}

Like

</button>

<button
className="
flex
items-center
gap-2
hover:text-blue-600
transition
font-semibold
"
>

💬

{comments.length}

Comment

</button>

<button
className="
flex
items-center
gap-2
hover:text-green-600
transition
font-semibold
"
>

🔄

Share

</button>

</div>

{/* Comments */}

<div className="px-6 pb-6">

<CommentList

comments={comments}

refreshComments={fetchComments}

/>

<CommentBox

postId={post._id}

refreshComments={fetchComments}

/>

</div>

</motion.div>

);
}
export default PostCard;