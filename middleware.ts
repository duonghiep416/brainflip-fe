import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
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
  console.log('req.url:', request.url);
  // Log các route thực sự cần kiểm tra
  console.log('Request pathname:', pathname);
  // Nếu không có token, redirect về trang login
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Nếu có token, redirect về trang chính

  return NextResponse.next();
}
