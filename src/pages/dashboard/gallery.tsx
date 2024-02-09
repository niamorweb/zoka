import { Separator } from "@/components/ui/separator";
import { GalleryForm } from "@/components/dashboard/gallery/gallery-form";
import Layout from "@/components/dashboard/layout/layout";

export default function DashboardGallery() {
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
        <GalleryForm />
      </div>
    </Layout>
  );
}
