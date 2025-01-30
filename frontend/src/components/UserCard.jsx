import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function UserCard({ user, isConnection }) {
	return (
 
		<div className='bg-white rounded-lg shadow p-4 flex flex-col flex-grow min-w-0 items-center transition-all hover:shadow-md'>
			<Link to={`/profile/${user.username}`} className='flex flex-col text-slate-600 items-center'>
				<LazyLoadImage
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-24 h-24 rounded-full object-cover mb-4'
				/>
				<h3 className='font-semibold text-lg text-center'>{user.name}</h3>
			</Link>
			<p className='text-gray-600 text-center truncate overflow-hidden whitespace-nowrap'>{user.headline}</p>
			<p className='text-sm text-gray-500 mt-2'>{user.connections?.length} connections</p>
			<button className='mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full'>
				{isConnection ? "Connected" : "Connect"}
			</button>
		</div>
		

			
	);
}

export default UserCard;