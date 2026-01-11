'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Image, Clock, LogOut, Home } from 'lucide-react';
import PhotosManager from '@/components/admin/PhotosManager';
import AppointmentsList from '@/components/admin/AppointmentsList';
import AvailabilitiesManager from '@/components/admin/AvailabilitiesManager';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'appointments' | 'photos' | 'availabilities'>('appointments');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-primary-600 hover:text-primary-700">
                <Home className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Bonjour, {session.user.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Rendez-vous
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'photos'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Image className="w-5 h-5" />
              Photos
            </button>
            <button
              onClick={() => setActiveTab('availabilities')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'availabilities'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Clock className="w-5 h-5" />
              Disponibilités
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'appointments' && <AppointmentsList />}
          {activeTab === 'photos' && <PhotosManager />}
          {activeTab === 'availabilities' && <AvailabilitiesManager />}
        </div>
      </div>
    </div>
  );
}
