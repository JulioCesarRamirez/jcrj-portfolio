import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-6 py-24">
      <p className="label-mono">404</p>
      <h1 className="h1 text-text">Page not found</h1>
      <ButtonLink href="/">Back home</ButtonLink>
    </Container>
  );
}
