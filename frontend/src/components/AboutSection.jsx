import { useState } from "react";
const AboutSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [about, setAbout] = useState(userData.about || "");
  
	const handleSave = () => {
	  onSave({ about });
	  setIsEditing(false);
	};
  
	return (
	  <div className="bg-base-300 shadow rounded-lg p-6 mb-6">
		<h2 className="text-xl font-semibold mb-4">About</h2>
  
		{!isEditing ? (
		  <p>{about}</p> // Display the updated `about` state here
		) : (
		  <textarea
			value={about}
			onChange={(e) => setAbout(e.target.value)}
			className="w-full p-2 border rounded"
			rows="4"
		  />
		)}
  
		{isOwnProfile && (
		  <button
			onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
			className={`mt-2 ${
			  isEditing
				? "bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
				: "bg-base-200 py-1 px-6 rounded hover:text-primary-dark"
			} transition duration-300`}
		  >
			{isEditing ? "Save" : "Edit"}
		  </button>
		)}
	  </div>
	);
  };
  
  export default AboutSection;
  