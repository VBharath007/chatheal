import Portal from "@/components/Portal";
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Portal admin={false}>{children}</Portal>;
}
