import Link from 'next/link';
import { Calendar, Scissors, Clock, MapPin, Phone, Star, Instagram, Facebook } from 'lucide-react';
import ReservationForm from '@/components/ReservationForm';
import Gallery from '@/components/Gallery';
import { salonConfig } from '@/lib/config';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Header - Navigation moderne et épurée */}
      <header className="bg-dark-light/90 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-beige/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-2xl md:text-3xl font-bold text-beige hover:text-beige-light transition-colors">
              ✂️ {salonConfig.name}
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/#salon" className="text-sm font-medium text-beige-light/80 hover:text-beige transition-colors">
                Le Salon
              </Link>
              <Link href="/#prestations" className="text-sm font-medium text-beige-light/80 hover:text-beige transition-colors">
                Prestations
              </Link>
              <Link href="/#gallery" className="text-sm font-medium text-beige-light/80 hover:text-beige transition-colors">
                Galerie
              </Link>
              <Link href="/#equipe" className="text-sm font-medium text-beige-light/80 hover:text-beige transition-colors">
                Notre Équipe
              </Link>
              <Link 
                href="/#reservation" 
                className="bg-beige text-dark px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-beige/90 transition-all hover:shadow-lg hover:scale-105"
              >
                Réserver
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Impactant */}
      <section className="relative bg-dark-gradient text-beige-light py-32 md:py-40 lg:py-48 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-beige rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-beige rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight text-beige-light">
              {salonConfig.name}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-beige-light/90 mb-6 font-light max-w-3xl mx-auto">
              {salonConfig.tagline}
            </p>
            <p className="text-base md:text-lg text-beige-light/70 mb-12 max-w-2xl mx-auto">
              {salonConfig.slogan}
            </p>
            <Link
              href="/#reservation"
              className="inline-flex items-center justify-center bg-beige text-dark px-10 py-5 rounded-lg font-black text-lg hover:bg-beige/90 transition-all hover:shadow-2xl hover:scale-105 shadow-xl"
            >
              PRENDRE RENDEZ-VOUS
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Style soulbarber76.com */}
      <section className="py-24 bg-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Le cadre', subtitle: 'tout le confort' },
              { num: '02', title: 'La nouveauté', subtitle: 'toutes les tendances' },
              { num: '03', title: 'La précision', subtitle: 'toute une équipe' },
              { num: '04', title: 'Les produits', subtitle: 'Toute la qualité' },
            ].map((feature, idx) => (
              <Link
                key={idx}
                href="/#reservation"
                className="group relative bg-dark-lighter/50 p-10 rounded-2xl card-shadow hover:card-shadow-lg transition-all duration-300 border border-beige/10 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-beige/5 rounded-full -mr-16 -mt-16 group-hover:bg-beige/10 transition-colors"></div>
                <div className="relative z-10">
                  <div className="text-6xl font-black text-beige/20 mb-6 group-hover:text-beige/30 transition-colors">
                    {feature.num}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-beige-light group-hover:text-beige transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-beige-light/70 mb-6 text-lg">
                    {feature.subtitle}
                  </p>
                  <span className="inline-flex items-center text-beige font-bold text-sm group-hover:text-beige-light transition-colors">
                    Réserver →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Style moderne */}
      <section id="salon" className="py-24 bg-dark barber-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-beige-light">
              Notre Salon
            </h2>
            <p className="text-xl md:text-2xl text-beige-light/80 max-w-3xl mx-auto mb-4">
              Un salon moderne pour hommes et femmes, où expertise et convivialité se rencontrent
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-beige-light">
                {salonConfig.description.title}
              </h3>
              <p className="text-lg text-beige-light/80 mb-4 leading-relaxed">
                <strong className="text-beige">{salonConfig.slogan}</strong>
              </p>
              {salonConfig.description.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-lg text-beige-light/80 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <Link
                href="/#reservation"
                className="inline-flex items-center gap-2 bg-beige text-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-beige/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                PRENDRE RENDEZ-VOUS
                <Calendar className="w-5 h-5" />
              </Link>
            </div>
            <div className="space-y-6">
              <div className="bg-dark-light rounded-xl p-6 border border-beige/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-beige p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-dark" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-beige/70 uppercase tracking-wider">HORAIRE</p>
                    <p className="text-lg font-semibold text-beige-light">Du lundi au Samedi: 10h - 19h00</p>
                  </div>
                </div>
                <Link href="/#salon" className="text-beige text-sm font-medium hover:text-beige-light transition-colors">
                  En savoir plus →
                </Link>
              </div>
              
              <div className="bg-dark-light rounded-xl p-6 border border-beige/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-beige p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-dark" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-beige/70 uppercase tracking-wider">RÉSERVATION</p>
                    <p className="text-lg font-semibold text-beige-light">Prendre rdv en 2mn</p>
                  </div>
                </div>
                <Link href="/#reservation" className="text-beige text-sm font-medium hover:text-beige-light transition-colors">
                  Réserver →
                </Link>
              </div>
              
              <div className="bg-dark-light rounded-xl p-6 border border-beige/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-beige p-3 rounded-lg">
                    <Star className="w-6 h-6 text-dark" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-beige/70 uppercase tracking-wider">TARIFS</p>
                    <p className="text-lg font-semibold text-beige-light">Consulter nos prestations</p>
                  </div>
                </div>
                <Link href="/#prestations" className="text-beige text-sm font-medium hover:text-beige-light transition-colors">
                  Afficher →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-dark-lighter barber-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-beige-light">Notre Galerie</h2>
            <p className="text-lg text-beige-light/70 max-w-2xl mx-auto">
              Découvrez nos dernières réalisations
            </p>
          </div>
          <Gallery />
        </div>
      </section>

      {/* Pricing Section - Style soulbarber76.com */}
      <section id="prestations" className="py-24 bg-dark-light barber-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-beige-light">Nos Tarifs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { name: 'Coupe Homme', price: '20€' },
              { name: 'Coupe Femme', price: '30€' },
              { name: 'Coupe Enfant', price: '15€' },
              { name: 'Taille de barbe', price: '10€' },
              { name: 'Rasage', price: '15€' },
              { name: 'Dégradé', price: '20€' },
              { name: 'Dégradé + Barbe', price: '25€' },
              { name: 'Brushing', price: '25€' },
              { name: 'Mise en plis', price: '30€' },
              { name: 'Coloration', price: 'À partir de 50€', note: 'Selon longueur' },
              { name: 'Mèches / Balayage', price: 'À partir de 60€', note: 'Selon longueur' },
              { name: 'Permanente', price: 'À partir de 40€', note: 'Selon longueur' },
              { name: 'Lissage', price: 'À partir de 80€', note: 'Selon longueur' },
              { name: 'Tresses', price: 'À partir de 40€', note: 'Selon complexité' },
              { name: 'Chignon / Coiffure de soirée', price: 'À partir de 35€', note: 'Selon complexité' },
              { name: 'Soin capillaire', price: 'À partir de 20€', note: 'Selon type de soin' },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-dark-lighter/50 p-6 rounded-xl card-shadow hover:card-shadow-lg hover-lift border border-beige/10 backdrop-blur-sm group"
              >
                <h3 className="font-bold text-lg mb-3 text-beige-light group-hover:text-beige transition-colors">
                  {service.name}
                </h3>
                <p className="text-3xl font-black text-beige mb-1">{service.price}</p>
                {service.note && (
                  <p className="text-sm text-beige-light/50">{service.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Nouvelle section */}
      <section id="equipe" className="py-24 bg-dark barber-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-beige-light">Notre Équipe</h2>
            <p className="text-lg text-beige-light/70 max-w-2xl mx-auto mt-4">
              Des professionnels expérimentés à votre service
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Stéphane', services: 'Coupe Homme, Dégradé, Barbe' },
              { name: 'Marie', services: 'Coupe Femme, Coloration, Brushing' },
              { name: 'Alexandre', services: 'Coupe Homme/Femme, Tresses, Soins' },
            ].map((stylist, idx) => (
              <div
                key={idx}
                className="bg-dark-light rounded-2xl p-8 card-shadow-lg border border-beige/10 hover:border-beige/20 transition-all group"
              >
                <h3 className="text-2xl font-bold mb-2 text-beige group-hover:text-beige-light transition-colors">
                  {stylist.name}
                </h3>
                <p className="text-beige-light/70 mb-6">{stylist.services}</p>
                <div className="flex gap-4 mb-6">
                  <a href="#" className="text-beige-light/60 hover:text-beige transition-colors" aria-label="Facebook" title="Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-beige-light/60 hover:text-beige transition-colors" aria-label="Instagram" title="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
                <Link
                  href="/#reservation"
                  className="inline-block w-full text-center bg-beige text-dark px-4 py-3 rounded-lg font-bold hover:bg-beige/90 transition-all"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section - Nouvelle section */}
      <section id="produits" className="py-24 bg-dark-lighter barber-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-beige-light">Nos Produits</h2>
            <p className="text-lg text-beige-light/70 max-w-2xl mx-auto mt-4">
              Des produits de qualité pour prendre soin de vos cheveux
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-dark-light rounded-2xl p-8 card-shadow-lg border border-beige/10 hover:border-beige/20 transition-all group">
              <h3 className="text-2xl font-bold mb-4 text-beige-light">Soins capillaires</h3>
              <p className="text-beige-light/70 mb-4">Shampoings, après-shampoings et masques</p>
              <Link
                href="#"
                className="inline-block text-beige font-bold hover:text-beige-light transition-colors"
              >
                Découvrir →
              </Link>
            </div>
            <div className="bg-dark-light rounded-2xl p-8 card-shadow-lg border border-beige/10 hover:border-beige/20 transition-all group">
              <h3 className="text-2xl font-bold mb-4 text-beige-light">Produits de coiffage</h3>
              <p className="text-beige-light/70 mb-4">Laques, gels et sprays de fixation</p>
              <Link
                href="#"
                className="inline-block text-beige font-bold hover:text-beige-light transition-colors"
              >
                Découvrir →
              </Link>
            </div>
            <div className="bg-dark-light rounded-2xl p-8 card-shadow-lg border border-beige/10 hover:border-beige/20 transition-all group">
              <h3 className="text-2xl font-bold mb-4 text-beige-light">Soins spécifiques</h3>
              <p className="text-beige-light/70 mb-4">Huiles, sérums et traitements</p>
              <Link
                href="#"
                className="inline-block text-beige font-bold hover:text-beige-light transition-colors"
              >
                Découvrir →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-24 bg-dark-gradient text-beige-light relative overflow-hidden barber-texture">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-beige rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">Réserver un rendez-vous</h2>
            <p className="text-lg text-beige-light/80">
              Prendre rdv en 2mn - Simple, rapide et gratuit
            </p>
          </div>
          <div className="bg-dark-light rounded-2xl p-8 md:p-10 text-beige-light card-shadow-lg border border-beige/10">
            <ReservationForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-beige-light py-16 border-t border-dark-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-black mb-6 text-beige">{salonConfig.name}</h3>
              <p className="text-beige-light/70 leading-relaxed mb-4">
                {salonConfig.slogan}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-beige text-lg">Horaires</h4>
              <div className="space-y-2 text-beige-light/70">
                <p>{salonConfig.hours.weekdays}</p>
                <p>{salonConfig.hours.saturday}</p>
                <p>{salonConfig.hours.sunday}</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-beige text-lg">Contact</h4>
              <div className="space-y-4 text-beige-light/70">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-beige flex-shrink-0 mt-0.5" />
                  <span>{salonConfig.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-beige flex-shrink-0" />
                  <a href={`tel:${salonConfig.phone.replace(/\s/g, '')}`} className="hover:text-beige transition-colors">
                    {salonConfig.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-dark-light/30 pt-8 text-center text-beige-light/50 text-sm">
            <p>&copy; {new Date().getFullYear()} {salonConfig.name} - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
