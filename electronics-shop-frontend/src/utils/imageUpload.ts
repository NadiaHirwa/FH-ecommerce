export async function uploadImage(file: File): Promise<string> {
  // client-side validation
  if (!file) throw new Error('No file');
  if (!/image\/(jpeg|png|webp|gif)/.test(file.type)) throw new Error('Unsupported image type');
  if (file.size > 5 * 1024 * 1024) throw new Error('Image too large (max 5MB)');

  // Try server upload first
  try {
    const form = new FormData();
    form.append('file', file);
    const resp = await fetch('/api/upload', { method: 'POST', body: form });
    if (resp.ok) {
      const json = await resp.json();
      if (json && (json.url || json.path)) return json.url || json.path;
    }
  } catch (e) {
    // ignore and fallback to data URL
  }

  // Fallback: read as data URL and return it
  return await new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(String(reader.result));
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}
