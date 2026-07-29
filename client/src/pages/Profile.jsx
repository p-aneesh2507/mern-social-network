import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import PostCard from "../components/PostCard";

function Profile() {

    const { user } = useContext(AuthContext);

    const { id } = useParams();

    const navigate = useNavigate();

    const profileId = id || user?._id || user?.id;

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {

        try {

            const res = await API.get(`/posts/user/${profileId}`);

            setPosts(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        if (profileId) {

            fetchPosts();

        }

    }, [profileId]);

    if (!user) {

        return (

            <div className="text-center py-20 text-xl">

                Loading Profile...

            </div>

        );

    }

    return (

        <div className="bg-slate-100 min-h-screen pb-10">

            {/* Cover */}

            <div className="h-52 bg-gradient-to-r from-blue-600 to-purple-600"></div>

            {/* Profile Card */}

            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-3xl shadow-lg -mt-20 p-8">

                    <div className="flex justify-between items-start">

                        <div className="flex gap-6 items-center">

                            <div
                                className="
                                w-36
                                h-36
                                rounded-full
                                bg-gradient-to-r
                                from-blue-500
                                to-purple-600
                                border-8
                                border-white
                                flex
                                items-center
                                justify-center
                                text-white
                                text-5xl
                                font-bold
                                "
                            >

                                {(user?.name || "").charAt(0).toUpperCase()}

                            </div>

                            <div>

                                <h1 className="text-4xl font-bold">

                                    {user.name}

                                </h1>

                                <p className="text-gray-500 text-lg">

                                    {user.email}

                                </p>

                            </div>

                        </div>

                        {/* Edit Button */}

                        {!id && (

                            <button

                                onClick={() => navigate("/profile/edit")}

                                className="
                                bg-blue-600
                                text-white
                                px-6
                                py-2
                                rounded-full
                                hover:bg-blue-700
                                transition
                                "

                            >

                                Edit Profile

                            </button>

                        )}

                    </div>

                    {/* Stats */}

                    <div className="flex gap-16 mt-10">

                        <div>

                            <h2 className="text-3xl font-bold">

                                {posts.length}

                            </h2>

                            <p className="text-gray-500">

                                Posts

                            </p>

                        </div>

                        <div>

                            <h2 className="text-3xl font-bold">

                                {user.followers?.length || 0}

                            </h2>

                            <p className="text-gray-500">

                                Followers

                            </p>

                        </div>

                        <div>

                            <h2 className="text-3xl font-bold">

                                {user.following?.length || 0}

                            </h2>

                            <p className="text-gray-500">

                                Following

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Posts */}

            <div className="max-w-3xl mx-auto mt-8 space-y-6">

                {

                    posts.length === 0 ?

                    (

                        <div className="bg-white rounded-2xl p-8 text-center text-gray-500">

                            No posts yet

                        </div>

                    )

                    :

                    (

                        posts.map(post => (

                            <PostCard

                                key={post._id}

                                post={post}

                                refreshPosts={fetchPosts}

                            />

                        ))

                    )

                }

            </div>

        </div>

    );

}

export default Profile;