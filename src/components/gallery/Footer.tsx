import Link from "next/link";
import { Separator } from "../ui/separator";

export default function footer({ userTheme }: any) {
  return (
    <div className="text-black">
      <Separator className="my-7 lg:my-14" orientation="horizontal" />
      <p className="text-center mb-10">
        Built by niamorweb -
        <Link target="_blank" className="underline underline-offset-2" href="/">
          Create your own page here
        </Link>
      </p>
    </div>
  );
}
