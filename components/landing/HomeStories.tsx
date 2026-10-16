import Image from "next/image";
import ScrollFade from "../ScrollFade";

// Copy verbatim from the Figma frame (385:14, node 427:707), including
// "quitter".
const STORIES = [
  {
    image: {
      src: "/assets/editions/detail/sora-row4-main.jpg",
      alt: "Umah Sora's living room opening onto the garden and pool",
    },
    caption:
      "Welcome to the living room: the place to go gather with friends and family. When the day warms up, the natural salt pool is just beyond the sofa.",
  },
  {
    image: {
      src: "/assets/home-stories-sora-stairs.jpg",
      alt: "A charred timber house on stilts with a round window, a staircase descending to the garden",
    },
    caption: "We need text here",
  },
];

/** Two-photo story row between the Approach gallery and the Collective
 * intro (Figma 385:14, node 427:707). */
// Hidden for now (waiting on the copy). Set to true to show the row again.
const SHOW_STORIES = false;

export default function HomeStories() {
  if (!SHOW_STORIES) return null;
  return (
    <section className="home-stories">
      <ScrollFade className="home-stories__row">
        {STORIES.map((s) => (
          <div className="home-stories__item" key={s.caption}>
            <div className="home-stories__image">
              <Image
                src={s.image.src}
                alt={s.image.alt}
                fill
                sizes="(min-width: 900px) 45vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="home-stories__caption">{s.caption}</p>
          </div>
        ))}
      </ScrollFade>
    </section>
  );
}
