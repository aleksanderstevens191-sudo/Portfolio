import { PortfolioPage } from "@/components/portfolio-page";
import { getGithubRepos } from "@/lib/github";

export default async function HomePage() {
  const repos = await getGithubRepos();

  return <PortfolioPage repos={repos} />;
}
