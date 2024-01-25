import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const ServerIdPage = () => {
  return (
    <>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </>
  );
};

export default ServerIdPage;
