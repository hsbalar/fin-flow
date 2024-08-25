import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface MainNavProps {
  items?: NavItem[];
}

interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}


export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <a href="/" className="flex items-center space-x-2">
        <Icons.laptop className="h-6 w-6" />
        <span className="inline-block font-bold">Wealth</span>
      </a>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <a
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </a>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
