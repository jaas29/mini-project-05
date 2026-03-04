import { useState, useEffect, useMemo } from "react";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination.jsx";
import Loader from "./components/Loader.jsx";
import { toast } from "react-toastify";

function App({ movies = [], wishlist = [], watched = [], loading, error, toggleWishlist, toggleWatched }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortOrder, setSortOrder] = useState("year-desc");
  const [currentPage, setCurrentPage] = useState(1);

  const genres = useMemo(
    () => [...new Set(movies.map((m) => m.genre).filter(Boolean))].sort(),
    [movies]
  );

  const ageGroups = useMemo(() => {
    const order = ["G", "PG", "PG-13", "R", "NC-17"];
    const found = new Set(movies.map((m) => m.age_group).filter(Boolean));
    return order.filter((ag) => found.has(ag));
  }, [movies]);

  const years = useMemo(
    () => [...new Set(movies.map((m) => m.releasing_year).filter(Boolean))].sort((a, b) => b - a),
    [movies]
  );

  const filteredMovies = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let result = movies.filter((m) => {
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q);
      const matchesGenre = !selectedGenre || m.genre === selectedGenre;
      const matchesAgeGroup = !selectedAgeGroup || m.age_group === selectedAgeGroup;
      const matchesYear = !selectedYear || String(m.releasing_year) === selectedYear;
      return matchesSearch && matchesGenre && matchesAgeGroup && matchesYear;
    });

    if (sortOrder === "year-desc") result = [...result].sort((a, b) => b.releasing_year - a.releasing_year);
    else if (sortOrder === "year-asc") result = [...result].sort((a, b) => a.releasing_year - b.releasing_year);
    else if (sortOrder === "rating-desc") result = [...result].sort((a, b) => b.imdb_rating - a.imdb_rating);
    else if (sortOrder === "rating-asc") result = [...result].sort((a, b) => a.imdb_rating - b.imdb_rating);
    else if (sortOrder === "title-asc") result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    else if (sortOrder === "title-desc") result = [...result].sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [movies, searchQuery, selectedGenre, selectedAgeGroup, selectedYear, sortOrder]);

  const MOVIES_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const paginatedMovies = useMemo(() => {
    const start = (currentPage - 1) * MOVIES_PER_PAGE;
    return filteredMovies.slice(start, start + MOVIES_PER_PAGE);
  }, [filteredMovies, currentPage]);

  useEffect(() => {
    if (!loading && !error && filteredMovies.length === 0) {
      toast.warn("No movies found for the specified filters.");
    }
  }, [filteredMovies.length, loading, error]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleSearchChange = (val) => { setSearchQuery(val); setCurrentPage(1); };
  const handleGenreChange = (val) => { setSelectedGenre(val); setCurrentPage(1); };
  const handleAgeGroupChange = (val) => { setSelectedAgeGroup(val); setCurrentPage(1); };
  const handleYearChange = (val) => { setSelectedYear(val); setCurrentPage(1); };
  const handleSortChange = (val) => { setSortOrder(val); setCurrentPage(1); };

  return (
    <section className="px-6 pb-16 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#F4E9CD] mb-6 border-l-4 border-[#468189] pl-4">
        Browse All Movies
      </h2>

      {loading && (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      )}
      {error && (
        <p className="text-center text-red-500 text-lg mt-10">
          Error loading movies: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="flex justify-center mb-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              selectedGenre={selectedGenre}
              onGenreChange={handleGenreChange}
              genres={genres}
              selectedAgeGroup={selectedAgeGroup}
              onAgeGroupChange={handleAgeGroupChange}
              ageGroups={ageGroups}
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
              years={years}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>

          {filteredMovies.length === 0 ? (
            <p className="text-center text-lg mt-20 text-white">
              No movies found for the specified filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedMovies.map((movie) => (
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
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}

export default App;
