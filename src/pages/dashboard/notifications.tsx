import { Separator } from "@/registry/new-york/ui/separator";
import { NotificationsForm } from "@/components/dashboard/notifications/notifications-form";
import Layout from "@/components/dashboard/layout/layout";

export default function SettingsNotificationsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Configure how you receive notifications.
          </p>
        </div>
        <Separator />
        <NotificationsForm />
      </div>
    </Layout>
  );
}
