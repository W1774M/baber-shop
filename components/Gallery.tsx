async function Gallery() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/photos`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch photos');
    }
    
    const photos = await res.json();

    if (!photos || photos.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-beige-light/50 text-lg">Aucune photo disponible pour le moment.</p>
          <p className="text-beige-light/30 text-sm mt-2">Revenez bientôt pour découvrir nos créations !</p>
        </div>
      );
    }

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {photos.map((photo: any) => (
          <div 
            key={photo.id} 
            className="relative group overflow-hidden rounded-xl card-shadow hover:card-shadow-lg transition-all duration-300 aspect-[4/3]"
          >
            <img
              src={photo.url}
              alt={photo.title || 'Photo de coupe'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            {photo.title && (
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-semibold text-beige-light text-lg mb-1">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-beige-light/80 text-sm">{photo.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error loading gallery:', error);
    return (
      <div className="text-center py-16">
        <p className="text-beige-light/50 text-lg">Erreur lors du chargement de la galerie.</p>
        <p className="text-beige-light/30 text-sm mt-2">Veuillez réessayer plus tard.</p>
      </div>
    );
  }
}

export default Gallery;
