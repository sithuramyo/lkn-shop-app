'use client';

import { useState } from 'react';
import { Menu, X, ShoppingCart, User, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from './mode-toggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between p-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/lkn-logo.png" alt="LKN-LOGO" />
          </Avatar>
          <Link href="/" className="text-2xl font-bold">
            Lawkanat Thingan House
          </Link>
        </div>


        {/* Icons */}
        <div className="flex items-center gap-2">
          <Input type="text" placeholder="Search products..." className="bg-transparent border-none focus:ring-0 outline-none" />
          <ModeToggle />
          <Link href="/wishlist" className="relative">
            <Heart className="w-6 h-6" />
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <Link href="/profile" className="relative">
            <User className="w-6 h-6" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden p-4 shadow-lg">
          <div className="mt-4 border-t pt-4">
            <Link href="/wishlist" className="block py-2">Wishlist</Link>
            <Link href="/cart" className="block py-2">Cart</Link>
            <Link href="/profile" className="block py-2">Profile</Link>
          </div>
        </nav>
      )}
    </header>
  );
}