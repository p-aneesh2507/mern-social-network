import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LeftSidebar() {

    const { user } = useContext(AuthContext);

    return (

        <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">

            <div className="flex flex-col items-center">

                <div
                    className="
                    w-20
                    h-20
                    rounded-full
                    bg-gradient-to-r
                    from-blue-600
                    to-purple-600
                    flex
                    items-center
                    justify-center
                    text-white
                    text-3xl
                    font-bold
                    "
                >

                    {user.name.charAt(0).toUpperCase()}

                </div>

                <h2 className="text-xl font-bold mt-4">

                    {user.name}

                </h2>

                <p className="text-gray-500">

                    {user.email}

                </p>

            </div>

            <hr className="my-5" />

            <div className="space-y-4">

                <div className="flex justify-between">

                    <span>Posts</span>

                    <span>25</span>

                </div>

                <div className="flex justify-between">

                    <span>Followers</span>

                    <span>120</span>

                </div>

                <div className="flex justify-between">

                    <span>Following</span>

                    <span>86</span>

                </div>

            </div>

        </div>

    );

}

export default LeftSidebar;