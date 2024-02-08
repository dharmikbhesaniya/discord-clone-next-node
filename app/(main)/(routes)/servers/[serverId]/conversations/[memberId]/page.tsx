import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) redirectToSignIn();

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile?.id,
    },
    include: {
      profile: true,
    },
  });
  if (!currentMember) return redirect("/");

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) return redirect(`/server${params.serverId}`);

  const { memberOne, memberTwo } = conversation;
  const otherMember =
    memberOne.profileId === profile?.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={params.serverId}
        name={otherMember.profile.name
          .split(" ")
          .filter((name) => name !== "null")
          .join(" ")}
        imageUrl={otherMember.profile.imageUrl}
        type="conversation"
      />
      <ChatMessages
        name={otherMember.profile.name}
        member={currentMember}
        chatId={conversation.id}
        type="conversation"
        apiUrl="/api/direct-messages"
        socketUrl="/api/socket/direct-messages"
        socketQuery={{ conversationId: conversation.id }}
        paramKey="conversationId"
        paramValue={conversation.id}
      />
      <ChatInput
        name={otherMember.profile.name
          .split(" ")
          .filter((name) => name !== "null")
          .join(" ")}
        type="conversation"
        apiUrl="/api/socket/direct-messages"
        query={{
          conversationId: conversation.id,
        }}
      />
    </div>
  );
};

export default MemberIdPage;
