// Minimal R2 helpers

export async function listR2Files(bucket) {
  try {
    const iter = bucket.list({ limit: 100 });
    const res = await iter;
    return (res.objects || []).map(o => ({ name: o.key }));
  } catch (_) {
    return [];
  }
}

export async function uploadR2File(bucket, key, data, contentType = "application/octet-stream") {
  try {
    await bucket.put(key, data, { httpMetadata: { contentType } });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export async function deleteR2File(bucket, key) {
  try {
    await bucket.delete(key);
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
