import { Container } from "@nextui-org/react";
interface LayoutProps {
  children: React.ReactNode;
}
function BaseLayout({ children }: LayoutProps) {
  return <Container fluid>{children}</Container>;
}

export default BaseLayout;
