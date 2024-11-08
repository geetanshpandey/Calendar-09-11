import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import { ExternalLink, Pen, Settings, Trash, Users2 } from "lucide-react";

import { EmptyState } from "../components/dashboard/EmptyState";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuActiveSwitcher } from "../components/dashboard/EventTypeSwitcher";
import { CopyLinkMenuItem } from "../components/dashboard/CopyLinkMenuItem";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },

    select: {
      EventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      username: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

const DashboardPage = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {/* Outermost container centered */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Centered heading and button */}
        <div className="flex flex-col items-center justify-center text-center mb-8 -mt-60">
          <h1 className="text-2xl font-semibold">Create and manage your event types.</h1>
          <Button asChild className="mt-4">
            <Link href="/dashboard/new">Create New Event</Link>
          </Button>
        </div>

        {data.EventType.length === 0 ? (
          <EmptyState
            title="You have no Event Types"
            description="You can create your first event type by clicking the button below."
            buttonText="Add Event Type"
            href="/dashboard/new"
          />
        ) : (
          <div className="w-full max-w-4xl"> {/* Center content with max width */}
            {data.EventType.map((item) => (
              <div key={item.id} className="border-none p-4 mb-4 rounded-lg">
                <Link href={`/dashboard/event/${item.id}`}>
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users2 className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium truncate">
                            {item.duration} Minutes Meeting
                          </dt>
                          <dd>
                            <div className="text-lg font-medium">
                              {item.title}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center space-x-2">
                  <MenuActiveSwitcher
                    initialChecked={item.active}
                    eventTypeId={item.id}
                  />

                  <Link href={`/dashboard/event/${item.id}`}>
                    <Button>Edit Event</Button>
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-20" align="end">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data.username}/${item.url}`}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Preview</span>
                          </Link>
                        </DropdownMenuItem>
                        <CopyLinkMenuItem
                          meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.username}/${item.url}`}
                        />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/event/${item.id}`}>
                            <Pen className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/event/${item.id}/delete`}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
