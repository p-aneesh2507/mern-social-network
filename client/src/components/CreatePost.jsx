import { useState } from "react";
import API from "../api/axios";

import {
    FaImage,
    FaSmile,
    FaPaperPlane
} from "react-icons/fa";

function CreatePost({ refreshPosts }) {
    const [image,setImage] = useState(null);
const [preview,setPreview] = useState("");
    const handleImage = (e)=>{

    const file = e.target.files[0];

    if(file){

        setImage(file);

        setPreview(
            URL.createObjectURL(file)
        );

    }

};

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

   const handlePost = async () => {

    try {

        const formData = new FormData();

        formData.append("content", content);


        if(image){
            formData.append("image", image);
        }


        await API.post("/posts", formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });


        setContent("");
        setImage(null);
        setPreview("");

        refreshPosts();


    } catch(err){

        console.log(err);

    }

};
    return (

        <div className="bg-white rounded-3xl shadow-lg p-6">

            {/* Header */}

            <div className="flex items-center gap-4 mb-5">

                <div className="
                    w-14
                    h-14
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-purple-600
                    flex
                    items-center
                    justify-center
                    text-2xl
                    text-white
                ">
                    😊
                </div>

                <div>

                    <h2 className="text-3xl font-bold">

                        Create a Post

                    </h2>

                    <p className="text-gray-500">

                        Share something with your friends

                    </p>

                </div>

            </div>

            {/* Text Area */}

            <textarea

                value={content}

                onChange={(e)=>setContent(e.target.value)}

                rows={5}

                maxLength={500}

                placeholder="✨ What's on your mind today?"

                className="
                    w-full
                    border
                    rounded-2xl
                    p-5
                    resize-none
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    text-lg
                "

            />
            {
preview && (

<div className="mt-4">

<img

src={preview}

className="
rounded-xl
max-h-64
object-cover
"

/>

</div>

)
}

            {/* Bottom */}

            <div className="flex justify-between items-center mt-5">

                <div className="flex gap-4 text-2xl">

               <label
className="
text-green-500
text-2xl
cursor-pointer
hover:scale-110
transition
"
>

<FaImage />

<input

type="file"

accept="image/*"

hidden

onChange={handleImage}

/>

</label>

                    <button className="text-yellow-500 hover:scale-110 transition">

                        <FaSmile />

                    </button>

                </div>

                <div className="flex items-center gap-5">

                    <span className="text-gray-500">

                        {content.length}/500

                    </span>

                    <button

                        onClick={handlePost}

                        disabled={loading}

                        className="
                            bg-gradient-to-r
                            from-blue-500
                            to-purple-500
                            text-white
                            px-8
                            py-3
                            rounded-full
                            font-semibold
                            flex
                            items-center
                            gap-2
                            hover:scale-105
                            transition
                        "

                    >

                        <FaPaperPlane />

                        {loading ? "Posting..." : "Publish"}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default CreatePost;