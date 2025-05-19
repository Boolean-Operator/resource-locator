import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2>Page Not Found</h2>
        <Image
          className="m-0 rounded-xl"
          src="/images/not-found-img.jpg"
          width={600}
          height={400}
          alt="Page Not Found"
          priority={true}
          title="Page Not Found"
        />
        <h3>
          <Link href="/community-resources">Return Home</Link>
        </h3>
      </div>
    </div>
  );
}
