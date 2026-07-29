import { useEffect, useState } from "react";
import API from "../api/axios";

import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

function Home() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
    console.log("Fetching posts...");

    try {
        const response = await API.get("/posts");

console.log("Posts:", response.data);

setPosts(response.data);
setLoading(false);
    } catch (err) {
        console.log("ERROR:", err);
         setLoading(false);
    } finally {
        console.log("Setting loading false");

        setLoading(false);
    }
};

    useEffect(() => {

        fetchPosts();

    }, []);

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                <div className="text-xl font-bold text-gray-500">

                    Loading Feed...

                </div>

            </div>

        );

    }

    return (

        <div className="bg-slate-100 min-h-screen">

            <div
                className="
                max-w-7xl
                mx-auto
                px-6
                py-8
                grid
                grid-cols-12
                gap-8
                "
            >

                {/* Left */}

                <div className="col-span-3">

                    <LeftSidebar />

                </div>

                {/* Feed */}

                <div className="col-span-6">

                    <CreatePost refreshPosts={fetchPosts} />

                    <div className="mt-6 space-y-6">

                        {

                            posts.map(post => (

                                <PostCard

                                    key={post._id}

                                    post={post}

                                    refreshPosts={fetchPosts}

                                />

                            ))

                        }

                    </div>

                </div>

                {/* Right */}

                <div className="col-span-3">

                    <RightSidebar />

                </div>

            </div>
<button
className="
fixed
bottom-8
right-8
w-16
h-16
rounded-full
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
text-4xl
shadow-xl
hover:scale-110
transition
"
>

+

</button>
        </div>

    );

}

export default Home;