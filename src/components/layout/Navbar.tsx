import Notification from "../features/Navbar/Notification";
import Profile from "../features/Navbar/Profile";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <section className="w-full  grid grid-cols-2  gap-x-4 lg:gap-x-6">
        <div className="col-end-3 flex justify-end items-center gap-x-4 lg:gap-x-6">
          <Notification />

          <div className="relative">
            <Profile />
          </div>
        </div>
      </section>
    </header>
  );
}
