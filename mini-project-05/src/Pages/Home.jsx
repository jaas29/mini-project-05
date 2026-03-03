import App from "../App";
import {ToastContainer} from "react-toastify";
import Navbar from "../components/Navbar.jsx";
import {RiMovie2AiFill} from "react-icons/ri";
import Loader from "../components/Loader.jsx";
import SearchBar from "../components/SearchBar.jsx";
import MovieCard from "../components/MovieCard.jsx";
import Pagination from "../components/Pagination.jsx";
import Footer from "../components/Footer.jsx";


function Home({ removeMovie, wishlist, watched,loading,error}) {


    return (
        <>
            <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
            <div className='navbar-wrapper'>
                <Navbar wishlist={wishlist} removeMovie={removeMovie} watched={watched} removeWatched={removeWatched}/>
            </div>
            <div className='background flex flex-col items-center text-center px-6 py-10 bg-[#031926]'>
                <div className='justify-center align-middle'>
                    <div className='flex flex-col items-center justify-center'>
                        <RiMovie2AiFill className='text-6xl md:text-8xl mb-6 mt-15 text-[#77ACA2] justify-center'  />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#77ACA2] m-10">Welcome to <span className="text-[#F4E9CD]"> JAS Movies!</span></h1>
                    <p className='text-lg md:text-xl text-[#77ACA2] max-w-3xl m-10'> Browse, search, and filter your favorite movies. Add the ones you love to your Watchlist or mark them as Already Watched. You can even download your lists as PDFs to keep track of your movie adventures!</p>
                </div>
                <div className="min-h-screen bg-[#031926] p-6 ">
                    {loading && (<Loader />)}
                    {error && <p className="text-center text-red-500 text-lg mt-10">Error loading movies: {error}</p>}
                    {!loading && !error && (
                        <div className="flex justify-center mb-6 bg-[#031926]">
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
                    )}
                    {filteredMovies.length === 0 && !loading && !error ? (
                        <p className="text-center text-lg mt-20" style={{ color: '#ffffff' }}>
                            No movies found for the specified filters.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto bg-[#031926]">
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
                </div>
            </div>
            <div className='footer'>
                <Footer />
            </div>

        </>
    );
}

export default Home;