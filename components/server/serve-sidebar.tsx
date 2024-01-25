import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { Separator } from "../ui/separator";
import ServerHeader from "./server-header";
import { ServerWithMembersWithProfile } from "@/types";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  if (!server) return redirect("/");

  const [textChannels, audioChannels, videoChannels] = Object.values(
    ChannelType
  ).map((type) => server?.channels.filter((channel) => channel.type === type));
  const members = server?.members.filter(
    (member: any) => member.profileId !== profile.id
  );
  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col items-center h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full"></ScrollArea>
    </div>
  );
};

export default ServerSidebar;

//   const textChannels = server?.channels.filter(
//     (channel: any) => channel.type === ChannelType.TEXT
//   );
//   const audioChannels = server?.channels.filter(
//     (channel: any) => channel.type === ChannelType.AUDIO
//   );
//   const videoChannels = server?.channels.filter(
//     (channel: any) => channel.type === ChannelType.VIDEO
//   );

//   const { TEXT, AUDIO, VIDEO } = ChannelType;
//   const [textChannels, audioChannels, videoChannels] = [TEXT, AUDIO, VIDEO].map(
//     (type) => server?.channels.filter((channel) => channel.type === type)
//   );
