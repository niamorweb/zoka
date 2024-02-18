import Link from "next/link";
import { Separator } from "../ui/separator";

export default function footer({ userTheme }: any) {
  return (
    <div
      className={
        userTheme === "dark"
          ? "bg-black text-neutral-200 py-14"
          : "bg-white text-black py-14"
      }
    >
      <Separator className="my-14" orientation="horizontal" />
      <p className="text-center mb-10">
        Built by niamorweb -
        <Link target="_blank" className="underline underline-offset-2" href="/">
          Create your own page here
        </Link>
      </p>
    </div>
  );
}
