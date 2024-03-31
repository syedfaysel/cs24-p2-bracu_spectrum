"use client";

import UserItem from "./UserItem";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";

const Sidebar = () => {
  const menuList = [
    {
      group: "General",
      items: [
        {
          label: "Home",
          icon: "HomeIcon",
          link: "/",
        },
        {
          label: "Dashboard",
          icon: "DashboardIcon",
          link: "/dashboard",
        },
        {
          label: "Calendar",
          icon: "CalendarIcon",
          link: "/calendar",
        },
        {
          label: "Inbox",
          icon: "InboxIcon",
          link: "/inbox",
        },
      ],
    },
    {
      group: "Administration",
      items: [
        {
          label: "Users",
          icon: "UsersIcon",
          link: "/users",
        },
        {
          label: "Roles",
          icon: "RolesIcon",
          link: "/roles",
        },
        {
          label: "Permissions",
          icon: "PermissionsIcon",
          link: "/permissions",
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          label: "Profile",
          icon: "ProfileIcon",
          link: "/profile",
        },
        {
          label: "Billing",
          icon: "BillingIcon",
          link: "/billing",
        },
        {
          label: "Settings",
          icon: "SettingsIcon",
          link: "/settings",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-[300px] border-r min-h-screen p-4">
      <div>
        <UserItem />
      </div>
      <div className="grow mt-3">
        <Command className="rounded-lg border shadow-md">
          <CommandList>
            {menuList.map((menu: any, key: number) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((item: any, index: number) => (
                  <CommandItem key={index}>
                    <RocketIcon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <div>Settings</div>
    </div>
  );
};

export default Sidebar;
