"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div>
      <Card>
        <CardContent>
          <div>
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1>This event is scheduled</h1>
          <p>
            We emailed you and the other attendees a calendar invitation with
            all the details.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/">Close this Page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
