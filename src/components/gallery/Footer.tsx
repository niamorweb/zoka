import Link from "next/link";

export default function footer() {
  return (
    <div className="pb-10 lg:pb-8 pt-10 lg:pt-20 gap-6">
      <p className="text-center">
        Kuta -
        <Link target="_blank" className="underline underline-offset-2" href="/">
          Create your own page free here
        </Link>
      </p>
    </div>
  );
}
