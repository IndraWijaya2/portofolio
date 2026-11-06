import { startTunnel } from "untun";

async function main() {
  console.log("Starting Cloudflare Tunnel for port 3000...");
  const tunnel = await startTunnel({
    port: 3000,
    acceptCloudflareNotice: true,
  });

  if (!tunnel) {
    console.error("Failed to create tunnel.");
    process.exit(1);
  }

  const url = await tunnel.getURL();
  console.log("==================================================");
  console.log(`CLOUDFLARE_TUNNEL_URL: ${url}`);
  console.log("==================================================");

  // Keep process alive indefinitely
  setInterval(() => {}, 1000 * 60 * 60);
}

main().catch((err) => {
  console.error("Error starting tunnel:", err);
  process.exit(1);
});
