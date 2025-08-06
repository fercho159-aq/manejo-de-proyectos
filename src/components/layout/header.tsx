import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      <Avatar>
        <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" />
        <AvatarFallback>MS</AvatarFallback>
      </Avatar>
    </header>
  );
}
