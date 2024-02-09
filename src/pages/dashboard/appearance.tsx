import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "@/components/dashboard/appearance/appearance-form";
import Layout from "@/components/dashboard/layout/layout";
import Head from "next/head";

export default function DashboardAppearance() {
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
            <h3 className="text-lg font-medium">Appearance</h3>
            <p className="text-sm text-muted-foreground">
              Customize the appearance of your page
            </p>
          </div>
          <Separator />
          <AppearanceForm />
        </div>
      </Layout>
    </>
  );
}
