import { Separator } from "@/registry/new-york/ui/separator";
import { AppearanceForm } from "@/components/dashboard/appearance/appearance-form";
import Layout from "@/components/dashboard/layout/layout";

export default function DashboardAppearance() {
  return (
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
  );
}
