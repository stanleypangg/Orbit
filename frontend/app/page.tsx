import { Chat } from "@/components/Chat";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 bg-white border-b">
        <Link
          href="/trellis"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Try Trellis 3D Generator →
        </Link>
      </div>
      <Chat />
    </div>
  );
}
