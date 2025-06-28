'use client';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useRouter, usePathname } from "next/navigation";
import { Book, Gamepad, Calendar, Video } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showGuestMsg, setShowGuestMsg] = useState(false);

  const navigationItems = [
    {
      title: "Schedule",
      path: "/schedule",
      icon: Calendar,
      description: "View and manage your teaching schedule"
    },
    {
      title: "Curate Quiz",
      path: "/assesment",
      icon: Book,
      description: "Create engaging quizzes for your students"
    },
    {
      title: "Training Videos", 
      path: "/resources",
      icon: Video,
      description: "Watch instructional videos and training materials"
    },
    {
      title: "Educational Games",
      path: "/games", 
      icon: Gamepad,
      description: "Access interactive educational games"
    },
    {
      title: "Attendance",
      path: "/attendence", 
      icon: Gamepad,
      description: "Access interactive educational games"
    }
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem("guest-try")) {
      setShowGuestMsg(true);
      setTimeout(() => {
        setShowGuestMsg(false);
        window.localStorage.removeItem("guest-try");
        router.push("/schedule");
      }, 2000);
    }
  }, [router]);

  return (
    <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-8">
        <div 
          className="flex items-center space-x-4 cursor-pointer" 
          onClick={() => router.push("/")}
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">VS</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">VigyanSaathi</h1>
            <p className="text-sm text-muted-foreground">Empowering Education Together</p>
          </div>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink
                  className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${
                    pathname === item.path ? 'bg-accent text-accent-foreground' : ''
                  }`}
                  onClick={() => router.push(item.path)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex items-center space-x-4">
        {pathname === "/" && showGuestMsg && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded font-medium mr-4 animate-pulse">
            Welcome, Guest! Redirecting to your schedule...
          </div>
        )}
        <Button variant="outline" size="sm" onClick={() => {
          if (pathname === "/") {
            window.localStorage.setItem("guest-try", "1");
            window.location.reload();
          } else {
            router.push("/sign-up?guest=true");
          }
        }}>
          Try as a Guest
        </Button>
        <Button variant="outline" size="sm">
          Help & Support
        </Button>
        <Avatar>
          <AvatarImage src="" alt="Volunteer" />
          <AvatarFallback className="bg-primary text-primary-foreground">VT</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;