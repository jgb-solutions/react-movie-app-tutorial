import { useEffect, useState } from 'react';

export default function Index() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(undefined);

  const fetchMovies = (page) => {
    setLoading(true);

    fetch(`https://movie-api-gbh.vercel.app/api/movies?page=${page}`)
      .then((response) => response.json())
      .then((result) => {
        setPage(result.page);
        setMovies((existingMovies) => [...existingMovies, ...result.data]);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies(page);
  }, []);

  const handleMovieClick = (movie) => {
    setCurrentMovie(movie);
  };

  const handleLoadMore = () => {
    fetchMovies(page + 1);
  };

  const handleClose = () => {
    setCurrentMovie(undefined);
  };

  return (
    <>
      <h1 className="text-3xl uppercase text-center">Movie App</h1>

      <div className="grid grid-cols-4 gap-3 p-4 border-white border-2 mt-8 rounded-lg mb-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative cursor-pointer"
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={movie.posterUrl}
              alt={movie.original_title}
              className="rounded-3xl"
            />
          </div>
        ))}
      </div>

      <div className="text-center p-4">
        <button
          className="border border-white py-2 px-4 rounded-lg hover:bg-white hover:text-black"
          onClick={handleLoadMore}
        >
          {loading ? 'Loading...' : 'Load more'}
        </button>
      </div>

      {currentMovie ? (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-80 flex items-center justify-center overflow-y-hidden">
          <div className="max-w-lg rounded-xl bg-gradient-to-t from-blue-600 to-purple-600 text-white flex flex-col justify-between p-4">
            <h4 className="text-2xl uppercase flex items-center justify-between">
              <span>{currentMovie.original_title}</span>
              <button
                className="text-sm bg-black w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500"
                onClick={handleClose}
              >
                X
              </button>
            </h4>
            <div className="overflow-y-auto mt-4 mb-4 flex-1">
              <img
                src={currentMovie.posterUrl}
                alt={currentMovie.original_title}
                className="rounded-3xl w-64 float-left mr-4"
              />
              <p>{currentMovie.overview}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
