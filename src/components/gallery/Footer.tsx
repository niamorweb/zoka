import Link from "next/link";
import { Separator } from "../ui/separator";

export default function footer() {
  return (
    <div className="bg-slate-50 py-14 lg:py-24 gap-6 text-black">
      <p className="text-center">
        Built by niamorweb -
        <Link target="_blank" className="underline underline-offset-2" href="/">
          Create your own page here
        </Link>
      </p>
    </div>
  );
}
