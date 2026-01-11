'use client';

import { useState, useEffect } from 'react';
import { Trash2, Upload } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
}

export default function PhotosManager() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/photos');
      const data = await res.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);

      const res = await fetch('/api/admin/photos', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        await fetchPhotos();
        setShowForm(false);
        setTitle('');
        setDescription('');
        setFile(null);
      } else {
        alert('Erreur lors de l\'upload');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) return;

    try {
      const res = await fetch(`/api/admin/photos?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchPhotos();
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des photos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Upload className="w-5 h-5" />
          Ajouter une photo
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleUpload} className="mb-8 p-6 bg-white rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fichier
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                aria-label="Sélectionner une image"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre (optionnel)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Titre de la photo (optionnel)"
                aria-label="Titre de la photo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optionnel)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Description de la photo (optionnel)"
                aria-label="Description de la photo"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={uploading || !file}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {uploading ? 'Upload en cours...' : 'Uploader'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setTitle('');
                  setDescription('');
                  setFile(null);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </form>
      )}

      {photos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Aucune photo pour le moment.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group bg-white rounded-lg shadow overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title || 'Photo'}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                {photo.title && (
                  <h3 className="font-semibold text-gray-900 mb-1">{photo.title}</h3>
                )}
                {photo.description && (
                  <p className="text-sm text-gray-600">{photo.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                aria-label="Supprimer la photo"
                title="Supprimer la photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
