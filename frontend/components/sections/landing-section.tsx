import React from "react";
import { Badge } from "../ui/badge";

export default function LandingSection() {
  return (
    <section className="text-center py-8">
      <div className="mb-4">
        <Badge variant="secondary" className="rounded-full px-4 py-2">
          رسالة ترحيب
        </Badge>
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold my-5">
        يا هلا فريق ثمانية!
      </h2>
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        ممتن لفرصة المشاركة في هذا التكليف، وآمل أن يعكس المشروع اهتمامي بالجودة
        والعناية بالتفاصيل، بما يتماشى مع رؤيتكم في ثمانية.
      </p>
    </section>
  );
}
