import Image from "next/image";

export default function Gallery() {
  return (
    <section className="gallery">
      <div className="gallery__row" tabIndex={0}>
        <Image
          className="gallery__image"
          src="/assets/gallery.png"
          alt="Umah Tsuki exterior at dusk"
          width={2200}
          height={1467}
        />
        <div className="gallery__caption">
          <div className="gallery__caption-top">
            <p className="gallery__title">Umah Tsuki</p>
            <p className="gallery__location">Pererenan, Bali</p>
          </div>
          <p className="gallery__meta">Residential • 2024</p>
        </div>
      </div>

      <div className="gallery__row gallery__row--end" tabIndex={0}>
        <div className="gallery__caption gallery__caption--left">
          <div className="gallery__caption-top">
            <p className="gallery__title">Umah Sora</p>
            <p className="gallery__location">Pererenan, Bali</p>
          </div>
          <p className="gallery__meta">Residential • 2024</p>
        </div>
        <Image
          className="gallery__image"
          src="/assets/guiding-values.png"
          alt="Timber pavilion with pool"
          width={1358}
          height={2000}
        />
      </div>

      <div className="gallery__row" tabIndex={0}>
        <Image
          className="gallery__image"
          src="/assets/gallery.png"
          alt="Umah Tsuki courtyard"
          width={2200}
          height={1467}
        />
        <div className="gallery__caption">
          <div className="gallery__caption-top">
            <p className="gallery__title">Umah Tsuki</p>
            <p className="gallery__location">Pererenan, Bali</p>
          </div>
          <p className="gallery__meta">Residential • 2024</p>
        </div>
      </div>
    </section>
  );
}
