export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl text-gray-600">Stranica nije pronađena</p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Nazad na početnu
      </a>
    </div>
  );
}
