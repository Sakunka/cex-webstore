export default function About() {
  const link = "/images/franchises/about-us-mobile.png";

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="order-1">
          <img
            src={link}
            alt="CeX About Us"
            className="rounded-3xl w-full h-64 md:h-80 lg:h-96 object-cover"
          />
        </div>

        <div className="order-2 space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              About CeX
            </h2>
          </div>

          <div className="space-y-6 leading-relaxed">
            <p>
              CeX was founded in London in 1992. We have stores in UK, Spain,
              Ireland, India, Australia, Portugal, Netherlands, Mexico, Italy,
              Poland and Malaysia.
            </p>

            <p>
              We buy, sell and exchange a range of technology and entertainment
              products including mobile phones, video games, DVDs and Blu-ray
              movies, computers, digital electronics, TVs and monitors, and
              music CDs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
