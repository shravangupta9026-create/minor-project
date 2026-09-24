import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="app-page flex min-h-screen items-center justify-center px-4 py-12">
      <section className="surface-card animate-enter w-full max-w-lg p-8 text-center sm:p-10">
        <p className="eyebrow">Page not found</p>
        <h1 className="display-title mt-3 text-3xl font-bold">This page is not here.</h1>
        <p className="mt-3 leading-7 text-zinc-600">The link may be outdated. Return home or open your learning dashboard.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="primary-button px-6 py-3 font-semibold text-white">Back to Home</Link>
          <Link to="/dashboard" className="secondary-button px-6 py-3 font-semibold text-zinc-700">Open Dashboard</Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
