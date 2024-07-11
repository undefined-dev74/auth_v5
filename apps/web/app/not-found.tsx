"use client"
import React from "react";

import Link from "next/link";
import Image from "next/image";
// components
import { PageHead } from "@/components/core";
// layouts
import DefaultLayout from "@/layouts/default-layout";

// ui
import { Button } from "react-day-picker";

// images
import Image404 from "/public/404.svg";
// types
import type { NextPage } from "next";


export default function NotFound() {
  
  
  return(
    <DefaultLayout>
      <PageHead title="404 - Page Not Found" />
      <div className="grid h-full place-items-center p-4">
        <div className="space-y-8 text-center">
          <div className="relative mx-auto h-60 w-60 lg:h-80 lg:w-80">
            <Image src={Image404} layout="fill" alt="404- Page not found" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Oops! Something went wrong.</h3>
            <p className="text-sm text-custom-text-200">
              Sorry, the page you are looking for cannot be found. It may have
              been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>
          <Link href="/">
            <span className="flex justify-center">
              <Button variant="primary" size="md">
                Go to Home
              </Button>
            </span>
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
} 


