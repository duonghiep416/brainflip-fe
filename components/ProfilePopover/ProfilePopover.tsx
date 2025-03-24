'use client';

import {
  Popover,
  Avatar,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import styles from './ProfilePopover.module.scss';
import { CiSettings } from 'react-icons/ci';
import { PiSignOut, PiUser } from 'react-icons/pi';
import clsx from 'clsx';
import { toast } from 'sonner';
import { useLoading } from '@/components/Providers/LoadingProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useGetMeQuery } from '@/features/user/userApiSlice';
import Link from 'next/link';

const ProfilePopover = () => {
  const { data: dataProfile, error, isLoading } = useGetMeQuery();
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoadingLogout(true);
      showLoading();
      
      // Call Next.js API route
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }
      
      // Navigate to login page after successful logout
      router.push('/login');
      router.refresh(); // Force a refresh to update auth state
    } catch (e: any) {
      toast.error(e.message || 'An error occurred during logout');
    } finally {
      setIsLoadingLogout(false);
      hideLoading();
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          src={dataProfile?.avatarUrl || "https://via.placeholder.com/40"}
          alt="User Avatar"
          size="sm"
          className="cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className={styles.popover}>
          {/* Header */}
          <div className={styles['menu-header']}>
            <div className="flex items-center gap-2">
              <Avatar
                src={dataProfile?.avatarUrl || "https://via.placeholder.com/40"}
                alt="User Avatar"
                size="md"
              />
              <div>
                <p className="font-bold">{dataProfile?.name || 'User'}</p>
                <p className={styles.email}>{dataProfile?.email}</p>
                <p className={styles.username}>@{dataProfile?.username}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="menu">
            <Link
              className={clsx(
                styles['menu-item'],
                'dark:hover:!bg-gray-100/10',
              )}
              href="/settings"
            >
              <CiSettings size={18} /> Settings
            </Link>
            <Link
              className={clsx(
                styles['menu-item'],
                'dark:hover:!bg-gray-100/10',
              )}
              href="/profile"
            >
              <PiUser size={18} /> Profile
            </Link>
          </div>

          {/* Logout */}
          <div 
            className={clsx(styles.logout, isLoadingLogout && 'opacity-50 cursor-not-allowed')} 
            onClick={!isLoadingLogout ? handleLogout : undefined}
          >
            <PiSignOut /> Log Out
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;