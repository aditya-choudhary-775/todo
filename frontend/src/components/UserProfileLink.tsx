import Link from "next/link";
import { IconUser } from "@tabler/icons-react";

const UserProfileLink = () => {
  return (
    <Link
      href="#"
      className="absolute top-4 right-4 flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-green-600"
    >
      <IconUser className="size-8 text-green-500" />
    </Link>
  );
};

export default UserProfileLink;
