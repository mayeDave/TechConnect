import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, UserPlus, X } from "lucide-react";

const RecommendedUser = ({ user }) => {
	const queryClient = useQueryClient();

	const { data: connectionStatus, isLoading } = useQuery({
		queryKey: ["connectionStatus", user._id],
		queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
	});

	const { mutate: sendConnectionRequest } = useMutation({
		mutationFn: (userId) => axiosInstance.post(`/connections/request/${userId}`),
		onSuccess: () => {
			toast.success("Connection request sent successfully");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const { mutate: acceptRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request accepted");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const { mutate: rejectRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request rejected");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const renderButton = () => {
		if (isLoading) {
			return (
				<button className='px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500' disabled>
					Loading...
				</button>
			);
		}

		switch (connectionStatus?.data?.status) {
            case "pending":
                return (
                    <button
                        className="px-4 py-2 rounded-full text-sm bg-yellow-500 text-white flex items-center gap-2 cursor-not-allowed"
                        disabled
                    >
                        <Clock size={16} />
                        Pending
                    </button>
                );
            case "received":
                return (
                    <div className="flex gap-2 justify-center">
                        <button
                            onClick={() => acceptRequest(connectionStatus.data.requestId)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white transition-transform duration-200 transform hover:scale-105"
                        >
                            <Check size={20} />
                        </button>
                        <button
                            onClick={() => rejectRequest(connectionStatus.data.requestId)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white transition-transform duration-200 transform hover:scale-105"
                        >
                            <X size={20} />
                        </button>
                    </div>
                );
            case "connected":
                return (
                    <button
                        className="px-4 py-2 rounded-full text-sm bg-green-500 text-white flex items-center gap-2 cursor-not-allowed"
                        disabled
                    >
                        <UserCheck size={16} />
                        Connected
                    </button>
                );
            default:
                return (
                    <button
                        className="px-4 py-2 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 flex items-center gap-2"
                        onClick={handleConnect}
                    >
                        <UserPlus size={16} />
                        Connect
                    </button>
                );
        }
        
	};

	const handleConnect = () => {
		if (connectionStatus?.data?.status === "not_connected") {
			sendConnectionRequest(user._id);
		}
	};

	return (
		<div className="flex items-center justify-between mb-4">
	{/* User Info */}
	<Link to={`/profile/${user.username}`} className="flex items-center flex-grow">
		<img
			src={user.profilePicture || "/avatar.png"}
			alt={user.name}
			className="w-12 h-12 rounded-full mr-3 shadow-lg border border-gray-300"
		/>
		<div>
			<h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{user.name}</h3>
			<p className="text-xs text-gray-500 dark:text-gray-400">{user.headline}</p>
		</div>
	</Link>
	{/* Action Button */}
	<div>{renderButton()}</div>
</div>

	);
};
export default RecommendedUser;