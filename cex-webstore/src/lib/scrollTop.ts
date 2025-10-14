export const scrollTop = () => {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};
