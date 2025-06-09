import { Button } from "@/components/ui/button";
import Icons from "@/components/icons";

export default function WithGoogleBtn() {
  return (
    <div className="grid gap-2">
      <Button variant="outline" className="w-full">
        <Icons.google className="mr-2 size-6" />
        Continue with Google
      </Button>
    </div>
  );
}
