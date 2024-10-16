export const getTokenFromCookie = () => {
  if (typeof document === 'undefined') return null; // Kiểm tra trên client
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(row => row.startsWith('auth-token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};
