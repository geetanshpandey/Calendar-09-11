"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 bg-light-100 dark:bg-dark-900">
      <Card className="w-full max-w-lg mx-auto shadow-xl bg-light-900 dark:bg-dark-800 text-dark-800 dark:text-white">
        <CardContent className="text-center">
          <div className="mb-4 flex items-center justify-center mt-12"> {/* Added mt-12 for top spacing */}
            <Check className="w-6 h-6 text-green-500 mr-2" />
            <h1 className="text-xl font-bold">This event is scheduled</h1>
          </div>
          <p className="text-md mb-4">
            We emailed you and the other attendees a calendar invitation with
            all the details.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full max-w-xs text-white" asChild>
            <Link href="/" className="text-center w-full">
              Close this Page
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
