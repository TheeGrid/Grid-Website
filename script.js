document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const images = track.querySelectorAll(".carousel-img");

  let position = 0;
  const gap = 24; // space-x-6 = 1.5rem = 24px
  const imgWidth = images[0].offsetWidth + gap;
  const totalImages = images.length;
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;

  // Auto-scroll
  let interval = setInterval(() => {
    if (isDragging) return;
    position += imgWidth;
    if (position >= imgWidth * totalImages) {
      position = 0;
    }
    track.style.transform = `translateX(-${position}px)`;
  }, 3000); // scroll every 3 seconds

  // Mouse drag
  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollStart = position;
    track.style.cursor = "grabbing";
    clearInterval(interval);
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    position = scrollStart - dx;
    track.style.transform = `translateX(-${position}px)`;
  });

  track.addEventListener("mouseup", () => {
    isDragging = false;
    track.style.cursor = "grab";
    interval = setInterval(() => {
      if (isDragging) return;
      position += imgWidth;
      if (position >= imgWidth * totalImages) {
        position = 0;
      }
      track.style.transform = `translateX(-${position}px)`;
    }, 3000);
  });

  track.addEventListener("mouseleave", () => {
    isDragging = false;
    track.style.cursor = "grab";
  });

  // Touch support
  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollStart = position;
    clearInterval(interval);
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].pageX - startX;
    position = scrollStart - dx;
    track.style.transform = `translateX(-${position}px)`;
  });

  track.addEventListener("touchend", () => {
    isDragging = false;
    interval = setInterval(() => {
      if (isDragging) return;
      position += imgWidth;
      if (position >= imgWidth * totalImages) {
        position = 0;
      }
      track.style.transform = `translateX(-${position}px)`;
    }, 3000);
  });
});
