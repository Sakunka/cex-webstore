export default function ReviewSection() {
  return (
    <div className="w-full md:w-1/4 h-auto relative rounded-2xl border-4">
      <img
        className="w-full h-full object-cover"
        src="https://uk.static.webuy.com/images/banners/uk-cex-trustpilot-top-rhs-main-page.png"
        width="300"
        height="200"
        alt="Trustpilot reviews - Rated GREAT with 475K+ reviews"
      />
      <span className="absolute top-12 left-5 right-5 -translate-y-1/2 text-white text-2xl">
        Rated GREAT 475K+ reviews
      </span>
    </div>
  );
}
