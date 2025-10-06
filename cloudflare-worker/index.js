// Cloudflare Worker for file operations and disk management
import { listR2Files } from "./r2";
import { listDisks, addDisk } from "./d1";

function corsHeaders(origin = "*") {
  return {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "*";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    if (url.pathname === "/api/files") {
      if (request.method === "GET") {
        const files = await listR2Files(env.R2_BUCKET);
        return new Response(JSON.stringify({ files }), {
          headers: corsHeaders(origin),
        });
      }
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (url.pathname === "/api/disks") {
      if (request.method === "GET") {
        const disks = await listDisks(env.DB);
        return new Response(JSON.stringify({ disks }), {
          headers: corsHeaders(origin),
        });
      }
      if (request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        const name = body?.name;
        if (!name) return new Response(JSON.stringify({ error: "name required" }), { status: 400, headers: { "content-type": "application/json" } });
        const result = await addDisk(env.DB, { name });
        return new Response(JSON.stringify(result), { headers: corsHeaders(origin) });
      }
      return new Response("Method Not Allowed", { status: 405 });
    }

    return new Response("Cloudflare Worker API is running!", {
      headers: { "content-type": "text/plain", "Access-Control-Allow-Origin": origin },
    });
  },
};
