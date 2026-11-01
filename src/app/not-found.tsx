import SiteLayout from "./(site)/layout";
import SiteNotFound from "./(site)/not-found";

/** 404 global (rotas inexistentes) com o mesmo visual do site. */
export default function NotFound() {
  return (
    <SiteLayout>
      <SiteNotFound />
    </SiteLayout>
  );
}
