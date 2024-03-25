import SectionMagazine11 from "@/components/Sections/SectionMagazine11";
import SectionMagazine11Wag from "@/components/Sections/SectionMagazine11Wag";
import { getCategories, getCategoriesWithPosts } from "@/data/dbCategories";

export default async function PageCategories() {
  const categories = await getCategories();
  const categoriesWithPosts = await getCategoriesWithPosts(categories);

  return (
    <div className="container relative">
      <SectionMagazine11Wag
        categories={categoriesWithPosts}
        className="py-16 lg:py-24"
      />
    </div>
  );
}
