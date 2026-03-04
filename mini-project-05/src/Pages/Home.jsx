import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiMovie2AiFill } from "react-icons/ri";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

function Home() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [watched, setWatched] = useState(() => {
    const saved = localStorage.getItem("watched");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const start = Date.now();
    fetch("/movie.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => {
        const remaining = Math.max(0, 2000 - (Date.now() - start));
        setTimeout(() => setLoading(false), remaining);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  const genres = useMemo(
    () => [...new Set(movies.map((m) => m.genre).filter(Boolean))].sort(),
    [movies]
  );

  const years = useMemo(
    () => [...new Set(movies.map((m) => m.releasing_year).filter(Boolean))].sort((a, b) => b - a),
    [movies]
  );

  const featuredMovies = useMemo(
    () => [...movies].sort((a, b) => b.imdb_rating - a.imdb_rating).slice(0, 6),
    [movies]
  );

  const toggleWishlist = (movie) => {
    setWishlist((prev) => {
      const exists = prev.find((m) => m.title === movie.title);
      if (exists) {
        toast.info(`"${movie.title}" removed from wishlist`);
        return prev.filter((m) => m.title !== movie.title);
      }
      toast.success(`"${movie.title}" added to wishlist`);
      return [...prev, movie];
    });
  };

  const toggleWatched = (movie) => {
    setWatched((prev) => {
      const exists = prev.find((m) => m.title === movie.title);
      if (exists) {
        toast.info(`"${movie.title}" removed from watched`);
        return prev.filter((m) => m.title !== movie.title);
      }
      toast.success(`"${movie.title}" added to watched`);
      return [...prev, movie];
    });
  };

  const removeMovie = (title) => setWishlist((prev) => prev.filter((m) => m.title !== title));
  const removeWatched = (title) => setWatched((prev) => prev.filter((m) => m.title !== title));

  const displayName = user
    ? user.displayName || user.email?.split("@")[0] || "User"
    : "Guest";

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      <div className="navbar-wrapper">
        <Navbar wishlist={wishlist} removeMovie={removeMovie} watched={watched} removeWatched={removeWatched} />
      </div>

      <div className="bg-[#031926] min-h-screen">

        {/* ── Hero Section ── */}
        <section className="flex flex-col items-center text-center px-6 pt-16 pb-12">
          <RiMovie2AiFill className="text-7xl md:text-9xl mb-6 text-[#77ACA2]" />

          <p className="text-sm font-semibold tracking-widest text-[#468189] uppercase mb-3">
            {user ? "Welcome back" : "Browsing as Guest"}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#F4E9CD] mb-4">
            Hello, <span className="text-[#77ACA2]">{displayName}!</span>
          </h1>
          <p className="text-lg md:text-xl text-[#9DBEBB] max-w-2xl mb-8">
            JAS Movies is your personal movie companion — browse a curated library, search by title or
            director, filter by genre, and keep track of what you want to watch or have already seen.
            Download your lists as PDFs anytime.
          </p>

          {!user && (
            <div className="flex gap-4 flex-wrap justify-center mb-4">
              <Link
                to="/login"
                className="px-6 py-2 rounded-full font-semibold bg-[#77ACA2] text-[#031926] hover:bg-[#9DBEBB] transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 rounded-full font-semibold border border-[#77ACA2] text-[#77ACA2] hover:bg-[#77ACA2] hover:text-[#031926] transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}

          {movies.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm">
              <span className="px-4 py-1 rounded-full bg-[#0B2533] text-[#77ACA2] border border-[#468189]">
                🎬 {movies.length} Movies
              </span>
              <span className="px-4 py-1 rounded-full bg-[#0B2533] text-[#77ACA2] border border-[#468189]">
                🎭 {genres.length} Genres
              </span>
              <span className="px-4 py-1 rounded-full bg-[#0B2533] text-[#77ACA2] border border-[#468189]">
                📅 {years.length} Years
              </span>
              <span className="px-4 py-1 rounded-full bg-[#0B2533] text-[#77ACA2] border border-[#468189]">
                ⭐ Top rated up to {featuredMovies[0]?.imdb_rating}/10
              </span>
            </div>
          )}
        </section>

        {/* ── Top Rated Picks ── */}
        {!loading && !error && featuredMovies.length > 0 && (
          <section className="px-6 pb-12 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F4E9CD] mb-6 border-l-4 border-[#77ACA2] pl-4">
              Top Rated Picks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMovies.map((movie) => (
                <MovieCard
                  key={movie.title}
                  movie={movie}
                  isWishlisted={wishlist.some((m) => m.title === movie.title)}
                  isWatched={watched.some((m) => m.title === movie.title)}
                  onToggleWishlist={toggleWishlist}
                  onToggleWatched={toggleWatched}
                />
              ))}
            </div>
          </section>
        )}


      </div>

      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Home;
