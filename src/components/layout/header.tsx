import { SidebarTrigger } from "@/components/ui/sidebar";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
    </header>
  );
}
