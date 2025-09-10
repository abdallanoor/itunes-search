import React from "react";
import { Badge } from "../ui/badge";

export default function LandingSection() {
  return (
    <section className="text-center py-8">
      <div className="mb-4">
        <Badge variant="secondary" className="rounded-full px-4 py-2">
          استكشف
        </Badge>
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold my-5">استمع إلى ما يهمك</h2>
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        ابحث في مكتبة iTunes الشاملة عن البودكاست الذي يلامس اهتماماتك. سواء كنت
        من محبي القصص، أو المعرفة، أو الفنون، ستجد محتوى غنيًا ومُلهِمًا
        بانتظارك.
      </p>
    </section>
  );
}
