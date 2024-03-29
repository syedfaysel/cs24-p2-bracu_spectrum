import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-center py-24">
      <h1 className="text-3xl">Welcome to EcoSync</h1>
      <p>Administration & Management | All in one place</p>

      <Button variant={"default"}>
        <Link href='/login'>Login</Link>
      </Button>
    </main>
  );
}
