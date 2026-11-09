// ---------- YouTube videos ----------
// Each video box has a data-youtube-id attribute. While it is empty, the box shows
// "Video coming soon". Paste the YouTube id there and the player appears.
(function () {
  document.querySelectorAll('[data-youtube-id]').forEach((box) => {
    const id = box.dataset.youtubeId.trim();
    if (!id) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}`;
    iframe.title = box.dataset.videoTitle;
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    box.replaceChildren(iframe);
  });

  // A link to a video stays hidden until its box has an id
  document.querySelectorAll('[data-youtube-link]').forEach((link) => {
    const box = document.getElementById(link.dataset.youtubeLink);
    const id = box ? box.dataset.youtubeId.trim() : '';
    if (!id) return;
    link.href = `https://www.youtube.com/watch?v=${id}`;
    link.hidden = false;
  });
})();
