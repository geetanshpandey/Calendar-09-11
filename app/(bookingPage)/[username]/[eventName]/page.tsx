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
import { Plus } from "lucide-react";

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
            <div className="flex flex-col items-center text-center mb-6">
              <Image
                src={eventType.user.image as string}
                alt={`${eventType.user.name}'s profile picture`}
                width={80}
                height={80}
                className="rounded-full border-2 border-primary"
              />
              <div className="mt-4">
                <p className="text-2xl font-semibold text-black dark:text-white">
                  {eventType.user.name}
                </p>
                <h1 className="text-xl font-semibold mt-2 text-black dark:text-white">
                  {eventType.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {eventType.description}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-y-3 text-center">
              <p className="flex justify-center items-center">
                <CalendarX2 className="mr-2 text-primary" />
                <span>{formattedDate}</span>
              </p>
              <p className="flex justify-center items-center">
                <Clock className="mr-2 text-primary" />
                <span>{eventType.duration} Mins</span>
              </p>
              <p className="flex justify-center items-center">
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
                <Input
                  name="name"
                  placeholder="Your Name"
                  className="border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-y-1">
                <Label>Your Email</Label>
                <Input
                  name="email"
                  placeholder="johndoe@gmail.com"
                  className="border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                  aria-label="Add"
                >
                  <Plus size={20} />
                </button>
                
                <SubmitButton text="Book Meeting" />
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <Image
                src={eventType.user.image as string}
                alt={`${eventType.user.name}'s profile picture`}
                width={80}
                height={80}
                className="rounded-full border-2 border-primary"
              />
              <div className="mt-4">
                <p className="text-2xl font-semibold text-white">
                  {eventType.user.name}
                </p>
                <h1 className="text-xl font-semibold mt-2 text-white">
                  {eventType.title}
                </h1>
                <p className="text-sm text-gray-400 mt-2">
                  {eventType.description}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-y-3 text-center">
              <p className="flex justify-center items-center">
                <CalendarX2 className="mr-2 text-primary" />
                <span>{formattedDate}</span>
              </p>
              <p className="flex justify-center items-center">
                <Clock className="mr-2 text-primary" />
                <span>{eventType.duration} Mins</span>
              </p>
              <p className="flex justify-center items-center">
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
