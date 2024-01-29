import { Channel, Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: Member &
    {
      role: any;
      id: Key | null | undefined;
      profileId: string;
      profile: Profile;
    }[];
  channels: Channel[];
};
