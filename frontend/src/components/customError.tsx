import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props {
  message: string;
}

const customError = ({ message }: Props) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-3xl">{message}</h1>
      <Button variant="secondary" className="text-rose-400 font-bold my-2">
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
};

export default customError;
