import Link from "next/link";
import Logo from "./Logo";

export interface Category {
  id: number;
  name: string;
}

async function getCategories(): Promise<Category[]> {
  const url = `${process.env.API_URL}/categories`;
  const response = await fetch(url, { cache: "no-store" }); 
  if (!response.ok) {
    console.error("Failed to fetch categories");
    return [];
  }
  const data = await response.json();
  
  return data ;
}

export default async function MainNav() {
  const categories = await getCategories();

  return (
    <header className="px-10 py-5 flex flex-col md:flex-row justify-between bg-indigo-300">
      <div className="flex justify-center">
        <Logo />
      </div>
      <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0 ">
        {
          categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.id}`}
              className="text-lg text-white font-bold hover:text-gray-500"
            >
              {category.name.toLowerCase()}
            </Link>
          ))
        }
      </nav>
    </header>
  );
}
