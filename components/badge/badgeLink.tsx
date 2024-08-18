import React from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface BadgeLinkProps {
  text: string;
  href: string;
}

const BadgeLink: React.FC<BadgeLinkProps> = ({ text, href }) => {
  return (
    <Link href={href}>
      <Badge variant="outline" className="px-2 opacity-80 hover:opacity-100">
        {text}
      </Badge>
    </Link>
  );
};

export default BadgeLink;
