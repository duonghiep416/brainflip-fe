import { SERVER_URL } from '@/configs/site.config';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const pathname = request.nextUrl.pathname;

  // Bỏ qua các request đến tài nguyên tĩnh như /_next/ hoặc /favicon.ico, /logo.svg
  if (
    pathname.startsWith('/_next') || // Bỏ qua tất cả các static assets từ /_next
    pathname.startsWith('/fonts') || // Bỏ qua các request đến font
    pathname === '/favicon.ico' || // Bỏ qua favicon
    pathname === '/logo.svg' // Bỏ qua logo
  ) {
    return NextResponse.next(); // Tiếp tục request mà không cần xử lý
  }
  // Nếu không có token, redirect về trang login
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Nếu có token, call api lấy thông tin người dùng để kiểm tra token
  if (token) {
    try {
      const response = await fetch(`${SERVER_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      const userData = await response.json();
      console.log('data', userData);
      console.log('response.ok', response.ok);
      // Check if the response is not ok (unauthorized)
      if (!response.ok) {
        // Clear the invalid token from cookies
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('auth-token');
        return response;
      }

      if (response.ok && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // If the response is ok, the token is valid
      // We can proceed with the request
    } catch (error) {
      console.error('Error checking token:', error);
      // In case of an error, we might want to redirect to login as well
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}