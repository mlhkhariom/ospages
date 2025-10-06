// Minimal D1 helpers for disks

export async function listDisks(db) {
  try {
    const { results } = await db.prepare("SELECT id, name FROM disks ORDER BY name ASC").all();
    return (results || []).map(r => ({ id: r.id, name: r.name }));
  } catch (_) {
    return [];
  }
}

export async function addDisk(db, diskInfo) {
  const name = (diskInfo?.name || "").trim();
  if (!name) return { success: false, error: "name required" };
  try {
    await db.prepare("INSERT INTO disks (name) VALUES (?)").bind(name).run();
    return { success: true };
  } catch (e) {
    return { success: false, error: "insert_failed" };
  }
}

export async function removeDisk(db, diskId) {
  try {
    await db.prepare("DELETE FROM disks WHERE id = ?").bind(diskId).run();
    return { success: true };
  } catch (e) {
    return { success: false, error: "delete_failed" };
  }
}
