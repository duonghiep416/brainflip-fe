'use client';

import { Button } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const BackBtn = () => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const appHistoryKey = 'appHistory';

    // Lấy lịch sử điều hướng từ sessionStorage
    const history = JSON.parse(sessionStorage.getItem(appHistoryKey) || '[]');

    // Kiểm tra điều kiện hiển thị nút "Back"
    const hasReferrer = document.referrer !== ''; // Có trang trước (bên ngoài)
    const hasInternalHistory = history.length > 0; // Có lịch sử nội bộ
    const hasBrowserHistory = window.history.length > 1; // Có lịch sử trình duyệt

    setCanGoBack(hasReferrer || hasInternalHistory || hasBrowserHistory);

    // Cập nhật lịch sử nội bộ nếu chưa tồn tại
    if (!history.includes(pathname)) {
      history.push(pathname);
      sessionStorage.setItem(appHistoryKey, JSON.stringify(history));
    }
  }, [pathname]);

  const handleBack = () => {
    const appHistoryKey = 'appHistory';
    const history = JSON.parse(sessionStorage.getItem(appHistoryKey) || '[]');

    if (history.length > 1) {
      // Quay lại trang trước đó trong lịch sử nội bộ
      history.pop(); // Loại bỏ trang hiện tại
      const previousPath = history[history.length - 1];
      sessionStorage.setItem(appHistoryKey, JSON.stringify(history));
      router.push(previousPath);
    } else if (document.referrer) {
      // Nếu không có lịch sử nội bộ nhưng có referrer, quay lại trang trước (bên ngoài)
      router.back();
    } else {
      // Fallback về trang chủ nếu không có lịch sử
      router.push('/');
      sessionStorage.removeItem(appHistoryKey);
    }
  };

  if (!canGoBack) {
    return null; // Không hiển thị nút Back nếu không có lịch sử
  }

  return (
    <Button
      size="md"
      radius="full"
      isIconOnly
      variant="bordered"
      onPress={handleBack}
    >
      <IoArrowBack />
    </Button>
  );
};

export default BackBtn;
