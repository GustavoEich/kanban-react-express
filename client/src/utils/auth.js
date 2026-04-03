export async function checkAuthStatus() {
  try {
    const res = await fetch('/api/me', { credentials: 'include' });
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (error) {
    return null;
  }
}