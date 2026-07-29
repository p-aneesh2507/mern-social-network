import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function EditProfile() {

    const { user, updateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [bio, setBio] = useState(user?.bio || "");

    const [profilePicture, setProfilePicture] = useState(null);

    const [preview, setPreview] = useState(
        user?.profilePicture
            ? `http://localhost:5000/${user.profilePicture}`
            : ""
    );

    const [loading, setLoading] = useState(false);

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (file) {

            setProfilePicture(file);

            setPreview(URL.createObjectURL(file));

        }

    };

    const handleSave = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("name", name);
            formData.append("email", email);
            formData.append("bio", bio);

            if (profilePicture) {

                formData.append(
                    "profilePicture",
                    profilePicture
                );

            }

            const res = await API.put(
                "/users/profile",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            updateUser(res.data.user);

            alert("Profile Updated Successfully");

            navigate("/profile");

        } catch (error) {

            console.log(error);

            alert("Unable to update profile");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-slate-100 min-h-screen py-10">

            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Cover */}

                <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600"></div>

                {/* Avatar */}

                <div className="flex justify-center -mt-16">

                    <div className="flex flex-col items-center">

                        {

                            preview ?

                                (

                                    <img

                                        src={preview}

                                        alt="Profile"

                                        className="
                                        w-32
                                        h-32
                                        rounded-full
                                        object-cover
                                        border-4
                                        border-white
                                        "

                                    />

                                )

                                :

                                (

                                    <div
                                        className="
                                        w-32
                                        h-32
                                        rounded-full
                                        border-4
                                        border-white
                                        bg-gradient-to-r
                                        from-blue-500
                                        to-purple-600
                                        flex
                                        items-center
                                        justify-center
                                        text-white
                                        text-5xl
                                        font-bold
                                        "
                                    >

                                        {name.charAt(0).toUpperCase()}

                                    </div>

                                )

                        }

                        <label
                            className="
                            mt-4
                            px-5
                            py-2
                            bg-blue-600
                            text-white
                            rounded-xl
                            cursor-pointer
                            hover:bg-blue-700
                            transition
                            "
                        >

                            Change Photo

                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImage}
                            />

                        </label>

                    </div>

                </div>

                <form
                    onSubmit={handleSave}
                    className="p-8"
                >

                    <h1 className="text-3xl font-bold text-center mb-8">

                        Edit Profile

                    </h1>

                    <div className="mb-6">

                        <label className="font-semibold">

                            Full Name

                        </label>

                        <input

                            type="text"

                            value={name}

                            onChange={(e)=>setName(e.target.value)}

                            className="
                            mt-2
                            w-full
                            border
                            rounded-xl
                            p-3
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "

                            required

                        />

                    </div>

                    <div className="mb-6">

                        <label className="font-semibold">

                            Email

                        </label>

                        <input

                            type="email"

                            value={email}

                            onChange={(e)=>setEmail(e.target.value)}

                            className="
                            mt-2
                            w-full
                            border
                            rounded-xl
                            p-3
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "

                            required

                        />

                    </div>

                    <div className="mb-8">

                        <label className="font-semibold">

                            Bio

                        </label>

                        <textarea

                            rows={5}

                            value={bio}

                            onChange={(e)=>setBio(e.target.value)}

                            className="
                            mt-2
                            w-full
                            border
                            rounded-xl
                            p-3
                            outline-none
                            resize-none
                            focus:ring-2
                            focus:ring-blue-500
                            "

                            placeholder="Tell people about yourself..."

                        />

                    </div>

                    <div className="flex justify-end gap-4">

                        <button

                            type="button"

                            onClick={()=>navigate("/profile")}

                            className="
                            px-6
                            py-3
                            rounded-xl
                            border
                            hover:bg-gray-100
                            transition
                            "

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            disabled={loading}

                            className="
                            px-8
                            py-3
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            to-purple-600
                            text-white
                            font-semibold
                            hover:scale-105
                            transition
                            "

                        >

                            {loading ? "Saving..." : "Save Changes"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditProfile;