import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/dashboard/profile/profile-form";
import Layout from "@/components/dashboard/layout/layout";
import Head from "next/head";

export default function dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - ZOKA</title>
        <meta
          name="description"
          content="Your personalized dashboard on ZOKA."
        />
        <meta
          name="keywords"
          content="dashboard, gallery, photos, personalized, zoka"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on your page.
            </p>
          </div>
          <Separator />
          <ProfileForm />
        </div>
      </Layout>
    </>
  );
}
