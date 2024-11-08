"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { SubmitButton } from "../components/SubmitButton";
import { useFormState } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchemaLocale } from "../lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { onboardingAction } from "../actions";

const OnboardingPage = () => {
  const [lastResult, action] = useFormState(onboardingAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchemaLocale });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 p-6">
      <Card className="w-full max-w-md p-8 shadow-2xl bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-400">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-900">
            Welcome to <span>Cal</span><span className="text-blue-600">Marshal</span>
          </CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">
            Please provide the following information to set up your profile.
          </CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent>
            {/* Full Name Field */}
            <div className="mb-6">
              <Label htmlFor={fields.fullName.name} className="text-lg text-gray-800">
                Full Name
              </Label>
              <Input
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder="Enter Full Name"
                id={fields.fullName.name}
                className="text-black w-full p-3 mt-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-400 bg-white"
              />
              {fields.fullName.errors && (
                <p className="text-red-500 text-sm mt-1">{fields.fullName.errors}</p>
              )}
            </div>

            {/* Username Field */}
            <div className="mb-6 bg-white text-black p-2 rounded-lg">
              <Label htmlFor={fields.username.name} className="text-lg text-gray-800">
                Username
              </Label>
              <div className="flex items-center rounded-lg bg-white text-black">
                <span className="bg-white px-4 text-gray-600">Unimanage.com/</span>
                <Input
                  type="text"
                  key={fields.username.key}
                  defaultValue={fields.username.initialValue}
                  name={fields.username.name}
                  placeholder="example-user-1"
                  className="rounded-l-none flex-1 p-3 mt-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-400 bg-white text-black"
                  id={fields.username.name}
                />
              </div>
              {fields.username.errors && (
                <p className="text-red-500 text-sm mt-1">{fields.username.errors}</p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <SubmitButton className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out" text="Submit" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default OnboardingPage;
