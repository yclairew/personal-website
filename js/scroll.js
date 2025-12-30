document.addEventListener('DOMContentLoaded', () => {
  const revealBoxes = document.querySelectorAll('.reveal-box');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.1 }
  );

  revealBoxes.forEach(box => observer.observe(box));
});
