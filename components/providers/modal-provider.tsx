"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../modals/create-server-modal";
import { InviteModal } from "../modals/invite-model";
import { EditServerModal } from "../modals/edit-server-modal";
import { MembersModal } from "../modals/members-model";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { LeaveServerModal } from "../modals/leave-server-model";
import { DeleteServerModal } from "../modals/delete-server-model";
import { DeleteChannelModal } from "../modals/delete-channel-model";
import { EditChannelModal } from "../modals/edit-channel-modal";
import { MessageFileModel } from "../modals/message-file-model";
import { DeleteMessageModal } from "../modals/delete-message-model";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModel />
      <DeleteMessageModal />
    </>
  );
};
