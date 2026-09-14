(() => {
  const root = document.documentElement;
  const progress = document.querySelector('#progressBar');
  const reveals = document.querySelectorAll('.reveal');
  const railLinks = [...document.querySelectorAll('.rail a')];
  const navLinks = [...document.querySelectorAll('.part-nav a')];
  const sections = [...document.querySelectorAll('[data-nav]')];

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  reveals.forEach((element) => revealObserver.observe(element));

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = `#${entry.target.id}`;
      railLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === target));
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === target));
    });
  }, { threshold: 0, rootMargin: '-46% 0px -46% 0px' });
  sections.forEach((section) => navObserver.observe(section));

  const updateProgress = () => {
    const max = root.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  addEventListener('resize', updateProgress);
  updateProgress();

  document.querySelector('#modeToggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-ui');
  });
})();
