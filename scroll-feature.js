(function () {
  var section = document.getElementById('feature-split');
  if (!section) return;

  var imageWrap = section.querySelector('.feature-split__image-wrap');
  var img1 = section.querySelector('.feature-split__image--1');
  var img2 = section.querySelector('.feature-split__image--2');
  var img3 = section.querySelector('.feature-split__image--3');
  var wordLeft = section.querySelector('.feature-split__word--left');
  var wordRight = section.querySelector('.feature-split__word--right');
  var mq = window.matchMedia('(min-width: 900px)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!mq.matches || reduceMotion) return;

  // Figma framing keyframes: 400px (start) -> 680px (mid) -> full-bleed (end).
  // Base box keeps the ~1.406 aspect ratio shared by feature-1/feature-2.
  var BASE_WIDTH = 400;
  var BASE_HEIGHT = 284.615;
  var MID_WIDTH = 680;
  var MID_HEIGHT = 483.846;
  var TEXT_TRAVEL = 56;
  // The reveal completes at this fraction of the pin's scroll runway; the
  // remainder holds the full-bleed frame in place before the next section.
  var REVEAL_FRACTION = 0.75;

  var targetProgress = 0;
  var shownProgress = 0;
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight;
  var ticking = false;
  var visible = false;

  function computeViewport() {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
  }

  function computeProgress() {
    var rect = section.getBoundingClientRect();
    var scrollable = section.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    var scrolled = -rect.top;
    var p = scrolled / (scrollable * REVEAL_FRACTION);
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    return p;
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function smoothstep(edge0, edge1, x) {
    var t = (x - edge0) / (edge1 - edge0);
    if (t < 0) t = 0;
    if (t > 1) t = 1;
    return t * t * (3 - 2 * t);
  }

  function boxForProgress(t) {
    if (t <= 0.5) {
      var e1 = easeInOutCubic(t / 0.5);
      return {
        w: lerp(BASE_WIDTH, MID_WIDTH, e1),
        h: lerp(BASE_HEIGHT, MID_HEIGHT, e1)
      };
    }
    var e2 = easeInOutCubic((t - 0.5) / 0.5);
    return {
      w: lerp(MID_WIDTH, viewportWidth, e2),
      h: lerp(MID_HEIGHT, viewportHeight, e2)
    };
  }

  function render() {
    ticking = false;
    var diff = targetProgress - shownProgress;
    shownProgress += diff * 0.12;
    if (Math.abs(diff) < 0.0005) shownProgress = targetProgress;

    var t = shownProgress;
    var box = boxForProgress(t);
    var insetX = Math.max(0, (viewportWidth - box.w) / 2);
    var insetY = Math.max(0, (viewportHeight - box.h) / 2);
    imageWrap.style.clipPath = 'inset(' + insetY.toFixed(2) + 'px ' + insetX.toFixed(2) + 'px)';

    // Seamless crossfade across the three framing keyframes: img1 -> img2 -> img3.
    // clip-path reveals a full-resolution image rather than upscaling a small
    // one, so there's no blur budget to manage here -- windows are just paced
    // for an even, three-way visual split, with img3 settling in time to be
    // the one shown during the full-bleed hold at the end.
    var risingA = smoothstep(0.2, 0.4, t);
    var risingB = smoothstep(0.6, 0.8, t);
    var o1 = 1 - risingA;
    var o2 = risingA - risingB;
    var o3 = risingB;
    img1.style.opacity = o1.toFixed(4);
    img2.style.opacity = o2.toFixed(4);
    img3.style.opacity = o3.toFixed(4);

    // Converging entrance, in the spirit of havenconstructions.com.au's ScrollGallery:
    // the flanking words slide inward from an offset and settle before the image covers them.
    var converge = easeOutCubic(smoothstep(0, 0.45, t));
    var travel = (1 - converge) * TEXT_TRAVEL;
    wordLeft.style.transform = 'translateX(' + (-travel).toFixed(2) + 'px)';
    wordRight.style.transform = 'translateX(' + travel.toFixed(2) + 'px)';

    if (visible && Math.abs(targetProgress - shownProgress) > 0.0005) {
      requestAnimationFrame(render);
      ticking = true;
    }
  }

  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }

  function onScroll() {
    targetProgress = computeProgress();
    requestTick();
  }

  function onResize() {
    computeViewport();
    onScroll();
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      visible = entry.isIntersecting;
      if (visible) requestTick();
    });
  }, { threshold: 0 });

  observer.observe(section);

  computeViewport();
  onScroll();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
})();
