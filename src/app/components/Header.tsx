'use client'

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            <Image
              src="/cccjb.png"
              alt="CCC Logo"
              className="h-20 mr-2"
              width={157}
              height={80}
            />
          </Link>
        </div>
        {isLoggedIn ? (
          <Button onClick={logout}>Log Out</Button>
        ) : (
          <Link href="/login" passHref>
            <Button>Log In</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

