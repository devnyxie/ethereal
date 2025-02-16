import { LuBook, LuHome, LuSquareCode, LuUser2 } from "react-icons/lu";
import { BiServer } from "react-icons/bi";

const links = [
  {
    title: "Home",
    href: "/",
    icon: LuHome,
  },
  {
    title: "Articles",
    href: "/articles",
    icon: LuBook,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: LuSquareCode,
  },
  {
    title: "Notes",
    href: "https://notes.devnyxie.com",
    icon: LuBook,
  },
  {
    title: "About",
    href: "/about",
    icon: LuUser2,
  },
  {
    title: "Status",
    href: "https://status.devnyxie.com/status/all",
    icon: BiServer,
  },
];

export default links;
