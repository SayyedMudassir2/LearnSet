'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/app/components/Navbar';

const HIDDEN_NAVBAR_PATHS = ['/login', '/register'];

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (HIDDEN_NAVBAR_PATHS.includes(pathname)) {
    return null;
  }

  return <Navbar />;
}
