import { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore"
import MessageSkeleton from "./skeletons/MessageSkeleton"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();

    useEffect(() => {
        getMessages(selectedUser._id);
    }, [getMessages, selectedUser._id]);

    if (isMessagesLoading) return <MessageSkeleton />
  return (
    <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />

        <p>messages ...</p>

        <MessageInput />

    </div>
  )
}

export default ChatContainer