import { useState } from "react";
import { Image, Loader } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { usePostStore } from "../store/usePostStore";

const PostCreation = ({ user }) => {
    const { createPost, isLoading } = usePostStore();

    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);


	const handlePostCreation = async() => {
        try {
            const postData = { content };
            if (image) postData.image = await readFileAsDataURL(image);
            
            createPost({ ...postData });
            resetForm();
        } catch (error) {
            console.error("Error in handlePostCreation:", error);
        }
    };

	const resetForm = () => {
		setContent("");
		setImage(null);
		setImagePreview(null);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			readFileAsDataURL(file).then(setImagePreview);
		} else {
			setImagePreview(null);
		}
	};

	const readFileAsDataURL = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	return (
        <div className="bg-gradient-to-b from-[#243b6e] to-[#1e3a8a] rounded-lg shadow-lg mb-6 p-6">
        {/* User Avatar and Input Section */}
        <div className="flex space-x-4 items-start">
            <LazyLoadImage
                src={user.profilePicture || "/avatar.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full shadow-md"
            />
            <textarea
                placeholder="What's on your mind?"
                className="w-full p-4 rounded-lg bg-[#1f3556] hover:bg-[#253f6d] focus:bg-[#253f6d] focus:outline-none text-white placeholder-gray-400 resize-none transition-colors duration-200 min-h-[100px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    
        {/* Image Preview Section */}
        {imagePreview && (
            <div className="mt-4">
                <LazyLoadImage
                    src={imagePreview}
                    alt="Selected"
                    className="w-full h-auto rounded-lg border border-gray-600 shadow-sm"
                />
            </div>
        )}
    
        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
            {/* File Upload Button */}
            <div className="flex space-x-4">
                <label className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
                    <Image size={20} className="mr-2" />
                    <span className="text-sm">Photo</span>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>
            </div>
    
            {/* Share Button */}
            <button
                className={`rounded-lg px-5 py-2 font-semibold transition-colors duration-200 ${
                    isLoading
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-[#00d9ff] text-white hover:bg-[#00b4cc]"
                }`}
                onClick={handlePostCreation}
                disabled={isLoading}
            >
                {isLoading ? <Loader className="size-5 animate-spin" /> : "Share"}
            </button>
        </div>
    </div>
    
	);
};
export default PostCreation;