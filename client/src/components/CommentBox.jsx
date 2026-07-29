import { useState } from "react";
import API from "../api/axios";

function CommentBox({ postId, refreshComments }) {

    const [text, setText] = useState("");

    const addComment = async (e) => {

        e.preventDefault();

        if (!text.trim()) return;

        try {

            await API.post(`/comments/${postId}`, {
                text
            });

            setText("");

            refreshComments();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <form onSubmit={addComment} className="mt-4">

            <div className="flex items-center gap-3">

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
                    😊
                </div>

                {/* Input */}

                <input

                    value={text}

                    onChange={(e) => setText(e.target.value)}

                    placeholder="Write a comment..."

                    className="
                    flex-1
                    bg-white
                    border
                    border-gray-300
                    rounded-full
                    px-5
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    "

                />

                {/* Send */}

                <button

                    type="submit"

                    disabled={!text.trim()}

                    className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-5
                    py-3
                    rounded-full
                    transition
                    disabled:opacity-50
                    "

                >

                    ➜

                </button>

            </div>

        </form>

    );

}

export default CommentBox;