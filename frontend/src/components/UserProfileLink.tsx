import Link from "next/link";
import { IconPower, IconUser } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const UserProfileLink = ({ className }: { className?: string }) => {
  return (
    <Link
      onClick={() => {
        localStorage.removeItem("token");
      }}
      href="/auth"
      className={cn(`relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-red-800`, className)}
    >
      <IconPower className="size-6 text-red-600" />
    </Link>
  );
};

export default UserProfileLink;
