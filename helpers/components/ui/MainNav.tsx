import Logo from "./Logo";

export default async function MainNav() {
    return (
      <header className="px-10 py-5  flex flex-col md:flex-row justify-between ">
          <div className="flex justify-center">
            <Logo />
          </div>
  
          <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
  
          </nav>
      </header>
    )
  }