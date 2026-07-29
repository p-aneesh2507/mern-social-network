import API from "../api/axios";

function CommentList({ comments, refreshComments }) {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const deleteComment = async (id) => {

        try {

            await API.delete(`/comments/${id}`);

            refreshComments();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="space-y-4">

            {

                comments.map((comment) => (

                    <div

                        key={comment._id}

                        className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        border-gray-200
                        p-4
                        hover:shadow-md
                        transition
                        "

                    >

                        <div className="flex justify-between">

                            <div className="flex gap-3">

                                {/* Avatar */}

                                <div
                                    className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-gradient-to-r
                                    from-blue-500
                                    to-purple-600
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                    font-bold
                                    "
                                >

                                    {comment.user?.name?.charAt(0).toUpperCase()}

                                </div>

                                <div>

                                    <h4 className="font-semibold text-gray-800">

                                        {comment.user?.name}

                                    </h4>

                                    <p className="text-gray-700 mt-1">

                                        {comment.text}

                                    </p>

                                    <p className="text-xs text-gray-400 mt-2">

                                        {new Date(comment.createdAt).toLocaleString()}

                                    </p>

                                </div>

                            </div>

                            {/* Show Delete only for own comment */}

                            {

                                currentUser &&
                                String(comment.user?._id) === String(currentUser.id) && (

                                    <button

                                        onClick={() => deleteComment(comment._id)}

                                        className="
                                        text-red-500
                                        hover:text-red-700
                                        transition
                                        "

                                    >

                                        🗑️

                                    </button>

                                )

                            }

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default CommentList;