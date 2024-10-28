import { cancelMeetingAction } from "@/app/actions";
import { EmptyState } from "@/app/components/dashboard/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButton";
import { auth } from "@/app/lib/auth";
import { nylas } from "@/app/lib/nylas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";
import React from "react";

// Define TypeScript types for event data if applicable
type EventData = {
  id: string;
  when: {
    startTime: number;
    endTime: number;
  };
  title: string;
  participants: { name: string }[];
  conferencing?: {
    details?: {
      url: string;
    };
  };
};

type MeetingDataResponse = {
  data: EventData[];
};

// Fetching data in a server component
async function getData(userId: string): Promise<MeetingDataResponse> {
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { grantId: true, grantEmail: true },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const data = await nylas.events.list({
    identifier: userData.grantId,
    queryParams: { calendarId: userData.grantEmail },
  });

  return data;
}

const MeetingsPage = async () => {
  const session = await auth(); // auth should be handled server-side in the app router

  if (!session) {
    return <p>You need to be logged in to view this page.</p>;
  }

  const data = await getData(session.user.id);

  if (!data || data.data.length < 1) {
    return (
      <EmptyState
        title="No meetings found"
        description="You don't have any meetings yet."
        buttonText="Create a new event type"
        href="/dashboard/new"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>
          See upcoming and past events booked through your event type links.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.data.map((item) => (
          <form key={item.id} action={cancelMeetingAction}>
            <input type="hidden" name="eventId" value={item.id} />
            <div>
              <div>
                <p className="text-muted-foreground text-sm">
                  {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                </p>
                <p className="text-muted-foreground text-xs pt-1">
                  {format(fromUnixTime(item.when.startTime), "hh:mm a")} -{" "}
                  {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                </p>
                {item.conferencing?.details?.url && (
                  <div className="flex items-center mt-1">
                    <Video className="size-4 mr-2 text-primary" />
                    <a
                      target="_blank"
                      rel="noopener noreferrer" // Added for security reasons
                      href={item.conferencing.details.url}
                    >
                      Join Meeting
                    </a>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-sm font-medium">{item.title}</h2>
                <p>
                  You and {item.participants[0]?.name || "other participants"}
                </p>
              </div>
              <SubmitButton
                text="Cancel Event"
                variant="destructive"
                className="w-fit flex ml-auto"
              />
            </div>
            <Separator className="my-3" />
          </form>
        ))}
      </CardContent>
    </Card>
  );
};

export default MeetingsPage;
