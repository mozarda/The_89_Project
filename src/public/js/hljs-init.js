// Initialize highlight.js after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }
});
