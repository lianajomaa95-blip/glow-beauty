export function flyToCart(imgElement, cartIconElement) {
  if (!imgElement || !cartIconElement) return;

  const imgRect = imgElement.getBoundingClientRect();
  const cartRect = cartIconElement.getBoundingClientRect();

  const clone = imgElement.cloneNode(true);

  clone.style.position = "fixed";
  clone.style.left = imgRect.left + "px";
  clone.style.top = imgRect.top + "px";
  clone.style.width = imgRect.width + "px";
  clone.style.height = imgRect.height + "px";
  clone.style.transition = "all 0.7s ease-in-out";
  clone.style.zIndex = 9999;
  clone.style.borderRadius = "12px";

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    clone.style.left = cartRect.left + "px";
    clone.style.top = cartRect.top + "px";
    clone.style.width = "20px";
    clone.style.height = "20px";
    clone.style.opacity = "0.2";
  });

  setTimeout(() => {
    clone.remove();
  }, 700);
}