import { Separator } from "@/registry/new-york/ui/separator";
import { ProfileForm } from "@/components/dashboard/profile/profile-form";
import Layout from "@/components/dashboard/layout/layout";

export default function dashboard() {
  return (
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
  );
}
