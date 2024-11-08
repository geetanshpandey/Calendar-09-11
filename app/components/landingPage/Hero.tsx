import Image from "next/image";
import HeroImage from "@/public/better.png";
import { AuthModal } from "./AuthModal";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden mt-20 dark:bg-black">
      <div className="container mx-auto text-center max-w-3xl px-6">
        <div className="mb-12">
          <span className="text-2xl font-medium text-gray-700 dark:text-gray-200">Introducing Calendly</span>

          <h1 className="text-6xl font-bold mt-4">
            Scheduling made{" "}
            <span className="block text-primary text-7xl">super easy!</span>
          </h1>

          <p className="mt-4 text-gray-600 text-1xl dark:text-gray-200">
            Scheduling a meeting can be a pain. But we at Unimanage make it easy
            for your clients to schedule meetings with you.
          </p>

          <div className="mt-8">
            <AuthModal />
          </div>
        </div>

        <div className="relative w-full flex justify-center mt-16">
          <svg
            className="absolute inset-0 blur-3xl"
            style={{ zIndex: -1 }}
            fill="none"
            viewBox="0 0 400 400"
            height="100%"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_10_20)">
              <g filter="url(#filter0_f_10_20)">
                <path
                  d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                  fill="#03FFE0"
                ></path>
                <path
                  d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                  fill="#7C87F8"
                ></path>
                <path
                  d="M320 400H400V78.75L106.2 134.75L320 400Z"
                  fill="#4C65E4"
                ></path>
                <path
                  d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                  fill="#043AFF"
                ></path>
              </g>
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="720.666"
                id="filter0_f_10_20"
                width="720.666"
                x="-160.333"
                y="-160.333"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  result="effect1_foregroundBlur_10_20"
                  stdDeviation="80.1666"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>

          <Image src={HeroImage} alt="Hero image" priority className="max-w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
