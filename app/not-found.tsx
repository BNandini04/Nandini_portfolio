import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-indigo-400">
        404
      </p>
      <h1 className="mt-6 text-5xl font-semibold tracking-tight text-gradient md:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 max-w-md text-pretty text-gray-400">
        That route doesn&apos;t exist. Everything worth seeing is on the home page.
      </p>
      <Link href="/" className={`${buttonVariants({ size: "lg" })} mt-10`}>
        Back home
      </Link>
    </main>
  );
}
