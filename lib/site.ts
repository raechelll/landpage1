export function resolveSiteUrl(
  environment: NodeJS.ProcessEnv = process.env,
): URL {
  const configuredUrl = environment.NEXT_PUBLIC_SITE_URL?.trim();
  const deploymentHost =
    environment.VERCEL_ENV === "preview"
      ? environment.VERCEL_URL || environment.VERCEL_BRANCH_URL
      : environment.VERCEL_PROJECT_PRODUCTION_URL ||
        environment.VERCEL_URL ||
        environment.VERCEL_BRANCH_URL;
  const address =
    configuredUrl ||
    deploymentHost ||
    `http://localhost:${environment.PORT || "3000"}`;
  const url = new URL(address.includes("://") ? address : `https://${address}`);

  if (!["https:", "http:"].includes(url.protocol)) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL harus berupa alamat HTTP atau HTTPS.",
    );
  }

  return new URL(url.origin);
}

export const siteUrl = resolveSiteUrl();
export const siteTitle = "BukaNota";
export const siteDescription =
  "BukaNota by PT Mega Homan Indonesia connects transaction records, inventory, checkout, and business finances in one system.";
