function RightSidebar() {

    const users = [

        "John",

        "Emma",

        "David",

        "Sophia"

    ];

    return (

        <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">

            <h2 className="font-bold text-xl mb-5">

                🔥 Trending Users

            </h2>

            {

                users.map(user => (

                    <div
                        key={user}
                        className="
                        flex
                        items-center
                        justify-between
                        mb-4
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                w-10
                                h-10
                                rounded-full
                                bg-gradient-to-r
                                from-pink-500
                                to-purple-600
                                text-white
                                flex
                                items-center
                                justify-center
                                "
                            >

                                {user.charAt(0)}

                            </div>

                            <span>{user}</span>

                        </div>

                        <button
                            className="
                            bg-blue-600
                            text-white
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            "
                        >

                            Follow

                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default RightSidebar;