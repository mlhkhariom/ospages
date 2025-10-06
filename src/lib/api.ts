export type ApiFile = { name: string };
export type ApiDisk = { id?: string; name: string };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ""; // empty = same origin

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function listFiles(): Promise<ApiFile[]> {
  try {
    const data = await fetchJson<{ files: ApiFile[] }>(`${API_BASE}/api/files`);
    return data.files ?? [];
  } catch {
    return [];
  }
}

export async function listDisks(): Promise<ApiDisk[]> {
  try {
    const data = await fetchJson<{ disks: ApiDisk[] }>(`${API_BASE}/api/disks`);
    return data.disks ?? [];
  } catch {
    return [];
  }
}

export async function createDisk(name: string): Promise<{ success: boolean } | null> {
  try {
    const data = await fetchJson<{ success: boolean }>(`${API_BASE}/api/disks`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return data;
  } catch {
    return null;
  }
}


