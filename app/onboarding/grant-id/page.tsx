import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";

const GrantIdRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-10">
      <Card className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-6 mb-6 -ml-10">
            <Image
              src="/logo.png" // Path to the image in the public folder
              alt="Logo"
              className="rounded-full"
              width={60} // 1.5x size increase
              height={60} // 1.5x size increase
            />
            <div className="flex items-center text-4xl font-semibold text-gray-900 dark:text-white -ml-4">
              <span className="text-3xl -ml-4">Calend</span> {/* 1.5x text size increase */}
              <span className="text-blue-600 text-3xl">ly</span> {/* 1.5x text size increase */}
            </div>
          </div>
          <CardTitle className="mt-8 text-xl text-gray-900 dark:text-white">
            You Are Almost Done!
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300 mt-8">
            We have to now connect your calendar to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full py-6 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out">
            <Link href="/api/auth" className="flex items-center justify-center">
              <CalendarCheck2 className="mr-4" />
              Connect Calendar to Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrantIdRoute;
