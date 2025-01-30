// pages/CollaborationPage.js
import { useEffect, useState } from "react";
import useCollaborationStore from "../store/useCollaborationStore";
import RecommendedUsers from "../components/RecommendedUsers";

const CollaborationPage = () => {
  const { collaborations, fetchCollaborations, loading, error } = useCollaborationStore();
  const [search, setSearch] = useState("");
  const [includeConnected, setIncludeConnected] = useState(false);

  useEffect(() => {
    fetchCollaborations(search, includeConnected);
  }, [search, includeConnected, fetchCollaborations]);

  const handleToggle = () => {
    setIncludeConnected((prev) => !prev);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Collaborations</h1>

      {/* Search Input & Button Wrapper */}
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by skills or headline..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />
        <button
          onClick={handleToggle}
          className={`px-4 py-3 w-full rounded-lg transition ${
            includeConnected ? "bg-base-content text-black" : "bg-base-300 text-base-content"
          }`}
        >
          {includeConnected ? "Exclude Connected" : "Include Connected"}
        </button>
      </div>

      {/* Collaboration List */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : collaborations.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collaborations.map((user) => (
            <RecommendedUsers key={user.id} user={user} isConnection={false} />
          ))}
        </div>
      ) : (
        <p>No collaborators found.</p>
      )}
    </div>
  );
};


export default CollaborationPage;
