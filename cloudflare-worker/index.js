// Cloudflare Worker for file operations and disk management
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/files") {
      // Placeholder: List files
      return new Response(JSON.stringify({ files: [] }), {
        headers: { "content-type": "application/json" },
      });
    }
    if (url.pathname === "/api/disks") {
      // Placeholder: List disks
      return new Response(JSON.stringify({ disks: [] }), {
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("Cloudflare Worker API is running!", {
      headers: { "content-type": "text/plain" },
    });
  },
};
