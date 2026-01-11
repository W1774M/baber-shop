'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface Appointment {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  appointmentDate: number;
  status: string;
  notes: string | null;
}

const statusConfig = {
  pending: { label: 'En attente', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmé', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Annulé', icon: XCircle, color: 'bg-red-100 text-red-800' },
  completed: { label: 'Terminé', icon: CheckCircle, color: 'bg-blue-100 text-blue-800' },
};

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/admin/appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        await fetchAppointments();
      } else {
        alert('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Liste des rendez-vous</h2>

      {appointments.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Aucun rendez-vous pour le moment.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => {
                const StatusIcon = statusConfig[appointment.status as keyof typeof statusConfig]?.icon || Clock;
                const statusColor = statusConfig[appointment.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800';
                const date = new Date(appointment.appointmentDate * 1000);

                return (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.clientName}</div>
                      {appointment.notes && (
                        <div className="text-sm text-gray-500">{appointment.notes}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(date, 'PPP à HH:mm', { locale: fr })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.clientEmail}</div>
                      {appointment.clientPhone && (
                        <div className="text-sm text-gray-500">{appointment.clientPhone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[appointment.status as keyof typeof statusConfig]?.label || appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {appointment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(appointment.id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Confirmer
                            </button>
                            <button
                              onClick={() => updateStatus(appointment.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Annuler
                            </button>
                          </>
                        )}
                        {appointment.status === 'confirmed' && (
                          <button
                            onClick={() => updateStatus(appointment.id, 'completed')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Terminer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
