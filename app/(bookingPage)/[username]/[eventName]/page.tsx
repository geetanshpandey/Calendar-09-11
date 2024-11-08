import { createMeetingAction } from "@/app/actions";
import { RenderCalendar } from "@/app/components/demo/RenderCalendar";
import { SubmitButton } from "@/app/components/SubmitButton";
import { TimeSlots } from "@/app/components/TimeSlots";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { BookMarked, CalendarX2, Clock } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

async function getData(username: string, eventName: string) {
  const eventType = await prisma.eventType.findFirst({
    where: {
      url: eventName,
      user: {
        username: username,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      user: {
        select: {
          image: true,
          name: true,
          Availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!eventType) {
    return notFound();
  }

  return eventType;
}

const BookingPage = async ({
  params,
  searchParams,
}: {
  params: { username: string; eventName: string };
  searchParams: { date?: string; time?: string };
}) => {
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();
  const eventType = await getData(params.username, params.eventName);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const showForm = !!searchParams.date && !!searchParams.time;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {showForm ? (
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardContent>
            <div className="flex items-center mb-6">
              <Image
                src={eventType.user.image as string}
                alt={`${eventType.user.name}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full border-2 border-primary"
              />
              <div className="ml-4 mt-6"> {/* Increased mt-6 for more spacing */}
                <p className="text-xl font-semibold text-white">{eventType.user.name}</p> {/* Username text size */}
                <h1 className="text-xl font-semibold mt-2 text-white">{eventType.title}</h1> {/* Title text size same as username */}
                <p className="text-sm text-white mt-2">{eventType.description}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="mr-2 text-primary" />
                <span>{formattedDate}</span>
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 text-primary" />
                <span>{eventType.duration} Mins</span>
              </p>
              <p className="flex items-center">
                <BookMarked className="mr-2 text-primary" />
                <span>{eventType.videoCallSoftware}</span>
              </p>
            </div>

            <Separator className="my-6" />

            <form
              className="flex flex-col gap-y-4"
              action={createMeetingAction}
            >
              <input type="hidden" name="eventTypeId" value={eventType.id} />
              <input type="hidden" name="username" value={params.username} />
              <input type="hidden" name="fromTime" value={searchParams.time} />
              <input type="hidden" name="eventDate" value={searchParams.date} />
              <input
                type="hidden"
                name="meetingLength"
                value={eventType.duration}
              />
              <div className="flex flex-col gap-y-1">
                <Label>Your Name</Label>
                <Input name="name" placeholder="Your Name" className="border-gray-300 shadow-sm focus:ring-primary focus:border-primary" />
              </div>

              <div className="flex flex-col gap-y-1">
                <Label>Your Email</Label>
                <Input name="email" placeholder="johndoe@gmail.com" className="border-gray-300 shadow-sm focus:ring-primary focus:border-primary" />
              </div>

              <SubmitButton text="Book Meeting" />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardContent>
            <div className="flex items-center mb-6">
              <Image
                src={eventType.user.image as string}
                alt={`${eventType.user.name}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full border-2 border-primary"
              />
              <div className="ml-4 mt-6"> {/* Increased mt-6 for more spacing */}
                <p className="text-xl font-semibold text-white">{eventType.user.name}</p> {/* Username text size */}
                <h1 className="text-xl font-semibold mt-2 text-white">{eventType.title}</h1> {/* Title text size same as username */}
                <p className="text-sm text-white mt-2">{eventType.description}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="mr-2 text-primary" />
                <span>{formattedDate}</span>
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 text-primary" />
                <span>{eventType.duration} Mins</span>
              </p>
              <p className="flex items-center">
                <BookMarked className="mr-2 text-primary" />
                <span>{eventType.videoCallSoftware}</span>
              </p>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-center">
              <RenderCalendar daysofWeek={eventType.user.Availability} />
            </div>

            <Separator className="my-6" />

            <TimeSlots
              selectedDate={selectedDate}
              userName={params.username}
              meetingDuration={eventType.duration}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingPage;
