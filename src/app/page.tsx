import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-sky-50 ">
      {/* <div className="bg-white bg-home-img bg-cover bg-center"> */}
      <header></header>
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        {/* <h1 className="text-8xl font-bold">LifePulse360</h1> */}
        <h1 className="text-8xl font-bold text-indigo-900">
          Community Resource Locator
        </h1>
        <h2 className="text-4xl my-10  text-indigo-900">
          A social and clinical community resource locator service designed to
          help case manager and partners locate service providers for clients.
        </h2>
        <div className="flex justify-center">
          <Button>
            <Link href="/community-resources">Log In</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
