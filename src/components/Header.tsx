import { NavButton } from "@/components/NavButton";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Files, HomeIcon, LifeBuoyIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { NavButtonMenu } from "./NavBUttonMenu";
import { Button } from "./ui/button";

export default async function Header() {
  const { getPermission } = getKindeServerSession();
  const [managerPermission] = await Promise.all([getPermission("manager")]);
  const isManager = managerPermission?.isGranted;
  if (!isManager) {
    return (
      <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
        <div className="flex h-8 items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <NavButton
              href="/community-resources"
              label="Home"
              icon={HomeIcon}
            />
            <Link
              href="/community-resources"
              className="flex justify-center items-center gap-2 ml-0"
              title="Home"
            >
              <h1 className="hidden sm:block text-xl">
                Community Resource Locator
              </h1>
            </Link>
          </div>
          <div className="flex items-center">
            {/* <NavButton href="/case-notes" label="Case Notes" icon={Files} /> */}
            <NavButtonMenu
              icon={Files}
              label="App Notes Menu"
              choices={[
                { title: "App Notes List", href: "/case-notes" },
                // { title: "New App Note", href: "/case-notes/form?clientId=5" },
              ]}
            />

            <NavButtonMenu
              icon={LifeBuoyIcon}
              label="Community Resource Menu"
              choices={[
                {
                  title: "Community Resources List",
                  href: "/community-resources",
                },
              ]}
            />

            <Button
              variant="ghost"
              size="icon"
              aria-label="LogOut"
              title="LogOut"
              className="round-full"
              asChild
            >
              <LogoutLink>
                <LogOut />
              </LogoutLink>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
        <div className="flex h-8 items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <NavButton
              href="/community-resources"
              label="Home"
              icon={HomeIcon}
            />
            <Link
              href="/community-resources"
              className="flex justify-center items-center gap-2 ml-0"
              title="Home"
            >
              <h1 className="hidden sm:block text-xl">
                Community Resource Locator
              </h1>
            </Link>
          </div>
          <div className="flex items-center">
            {/* <NavButton href="/case-notes" label="Case Notes" icon={Files} /> */}
            <NavButtonMenu
              icon={Files}
              label="Case Notes Menu"
              choices={[
                { title: "Case Notes List", href: "/case-notes" },
                { title: "New Case Note", href: "/case-notes/form?clientId=5" },
              ]}
            />

            <NavButtonMenu
              icon={LifeBuoyIcon}
              label="Community Resource Menu"
              choices={[
                {
                  title: "Community Resources List",
                  href: "/community-resources",
                },
                {
                  title: "New Community Resource",
                  href: "/community-resources/form",
                },
              ]}
            />

            <Button
              variant="ghost"
              size="icon"
              aria-label="LogOut"
              title="LogOut"
              className="round-full"
              asChild
            >
              <LogoutLink>
                <LogOut />
              </LogoutLink>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>
    );
  }
}
