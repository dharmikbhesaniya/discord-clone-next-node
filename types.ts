import { Channel, Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfile = Server & {
  members: Member & {
      profileId: string; profile: Profile 
}[];
  channels: Channel[];
};