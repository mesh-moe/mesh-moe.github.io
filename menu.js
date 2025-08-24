(function(){
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.mobile-menu');
  if(!toggle || !overlay) return;
  const links = overlay.querySelectorAll('a');
  function close(){
    toggle.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded','false');
  }
  toggle.addEventListener('click', () => {
    const on = toggle.classList.toggle('active');
    overlay.classList.toggle('active', on);
    document.body.style.overflow = on ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', String(on));
  });
  links.forEach(a => a.addEventListener('click', close));
  // Close on Escape
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      close();
    }
  });
  // Close when clicking outside the menu (overlay background)
  overlay.addEventListener('click', function(e){
    if (e.target === overlay) {
      close();
    }
  });
})();
