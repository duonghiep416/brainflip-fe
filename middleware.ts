import { NextRequest, NextResponse } from 'next/server';

// Danh sách các đường dẫn công khai không yêu cầu xác thực
const publicPaths = ['/login', '/landing', '/forgot-password/reset'];

// Danh sách các đường dẫn tài nguyên tĩnh cần bỏ qua
const staticPaths = [
  '/_next',
  '/fonts',
  '/favicon.ico',
  '/logo.svg',
  '/screenshot.png',
  '/api',  // Bỏ qua các API route
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Kiểm tra nếu là tài nguyên tĩnh, bỏ qua xử lý
  if (staticPaths.some(path => pathname === path || pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Kiểm tra nếu là đường dẫn công khai, cho phép truy cập
  if (publicPaths.some(path => pathname === path || pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  const token = request.cookies.get('accessToken');
  
  // Nếu không có token, chuyển hướng về trang landing
  if (!token) {
    return NextResponse.redirect(new URL('/landing', request.url));
  }
  
  // Nếu có token và đang ở trang login, chuyển hướng về trang chủ
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Có token, cho phép truy cập - API "me" sẽ được gọi trong trang để xác thực và lấy profile
  return NextResponse.next();
}

// Cấu hình matcher để chỉ áp dụng middleware cho các đường dẫn cần thiết
export const config = {
  matcher: [
    // Matcher cho tất cả các đường dẫn ngoại trừ các tài nguyên tĩnh
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};