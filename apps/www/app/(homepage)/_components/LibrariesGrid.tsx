import { AppSection } from "@kolosys-sites/theme";
import { getAllLibraries } from "@/actions/libraries";
import { LibrariesGridClient } from "./LibrariesGridClient";

export async function LibrariesGrid() {
  const libraries = await getAllLibraries();

  return (
    <AppSection id="libraries" elevated className="py-16 scroll-normal">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Production-Tested Libraries for Every Use Case
          </h2>
          <p className="text-lg text-caption max-w-2xl mx-auto">
            Browse by category or search by name
          </p>
        </div>

        <LibrariesGridClient libraries={libraries} />
      </div>
    </AppSection>
  );
}
