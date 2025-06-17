import { Badge } from "./ui/badge";

export default function Logo() {
  return (
    <span className="text-xl font-bold text-violet-500 ">
      proj.ly
      <Badge  className="ml-2">
        <span className="text-xs">v0.1.0</span>
      </Badge>
    </span>
  )
}
