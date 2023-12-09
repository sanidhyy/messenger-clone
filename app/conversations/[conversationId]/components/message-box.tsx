"use client";

import clsx from "clsx";
import Image from "next/image";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import type { FullMessageType } from "@/app/types";
import Avatar from "@/app/components/avatar";

type MessageBoxProps = {
  data: FullMessageType;
  isLast?: boolean;
};

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  // classes
  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "item-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>

      <div className={body}>
        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-500">{data.sender.name}</p>
          <time
            dateTime={format(new Date(data.createdAt), "p")}
            className="text-xs text-gray-400"
            suppressHydrationWarning
          >
            {format(new Date(data.createdAt), "p")}
          </time>
        </div>

        <div className={message}>
          {data.image ? (
            <Image
              src={data.image}
              alt="image"
              height={288}
              width={288}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <p>{data.body}</p>
          )}
        </div>

        {isLast && isOwn && seenList.length > 0 && (
          <span className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
