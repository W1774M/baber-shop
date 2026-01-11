'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function ReservationForm() {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }
    if (searchParams.get('error') === 'true') {
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {success && (
        <div className="mb-6 p-4 bg-dark-lighter/50 border-l-4 border-beige text-beige-light rounded-lg flex items-start gap-3 animate-fade-in-up backdrop-blur-sm">
          <CheckCircle className="w-5 h-5 text-beige flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Réservation enregistrée !</p>
            <p className="text-sm text-beige-light/70">
              Votre réservation a été enregistrée avec succès. Nous vous contacterons bientôt pour confirmer.
            </p>
          </div>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-dark-lighter/50 border-l-4 border-dark text-beige-light rounded-lg flex items-start gap-3 animate-fade-in-up backdrop-blur-sm">
          <XCircle className="w-5 h-5 text-beige flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Erreur</p>
            <p className="text-sm text-beige-light/70">
              Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="clientName" className="block text-sm font-semibold text-beige-light mb-2">
            Nom complet <span className="text-beige-light/50">*</span>
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            required
            className="w-full px-4 py-3 bg-dark-lighter/30 border-2 border-beige/20 rounded-lg focus:ring-2 focus:ring-beige focus:border-beige text-beige-light placeholder-beige-light/30 transition-all backdrop-blur-sm"
            placeholder="Votre nom complet"
          />
        </div>
        <div>
          <label htmlFor="clientEmail" className="block text-sm font-semibold text-beige-light mb-2">
            Email <span className="text-beige-light/50">*</span>
          </label>
          <input
            type="email"
            id="clientEmail"
            name="clientEmail"
            required
            className="w-full px-4 py-3 bg-dark-lighter/30 border-2 border-beige/20 rounded-lg focus:ring-2 focus:ring-beige focus:border-beige text-beige-light placeholder-beige-light/30 transition-all backdrop-blur-sm"
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <label htmlFor="clientPhone" className="block text-sm font-semibold text-beige-light mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            id="clientPhone"
            name="clientPhone"
            className="w-full px-4 py-3 bg-dark-lighter/30 border-2 border-beige/20 rounded-lg focus:ring-2 focus:ring-beige focus:border-beige text-beige-light placeholder-beige-light/30 transition-all backdrop-blur-sm"
            placeholder="06 12 34 56 78"
          />
        </div>
        <div>
          <label htmlFor="appointmentDate" className="block text-sm font-semibold text-beige-light mb-2">
            Date et heure <span className="text-beige-light/50">*</span>
          </label>
          <input
            type="datetime-local"
            id="appointmentDate"
            name="appointmentDate"
            required
            className="w-full px-4 py-3 bg-dark-lighter/30 border-2 border-beige/20 rounded-lg focus:ring-2 focus:ring-beige focus:border-beige text-beige-light transition-all backdrop-blur-sm"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-beige-light mb-2">
            Notes (optionnel)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full px-4 py-3 bg-dark-lighter/30 border-2 border-beige/20 rounded-lg focus:ring-2 focus:ring-beige focus:border-beige text-beige-light placeholder-beige-light/30 transition-all resize-none backdrop-blur-sm"
            placeholder="Précisions sur votre demande..."
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-beige text-dark px-6 py-4 rounded-lg font-semibold hover:bg-beige/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Envoi en cours...</span>
            </>
          ) : (
            'Réserver maintenant'
          )}
        </button>
        <p className="text-xs text-beige-light/50 text-center">
          * Champs obligatoires. Votre réservation sera confirmée par email.
        </p>
      </form>
    </div>
  );
}
