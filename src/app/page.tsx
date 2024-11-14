import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold">Next Authentication</h1>
      <Link href="/profile">Goto Profile</Link>
    </div>
  );
}
