import { Separator } from "@/components/ui/separator";
import { AccountForm } from "@/components/dashboard/account/account-form";
import Layout from "@/components/dashboard/layout/layout";

export default function SettingsAccountPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings.
          </p>
        </div>
        <Separator />
        <AccountForm />
      </div>
    </Layout>
  );
}
