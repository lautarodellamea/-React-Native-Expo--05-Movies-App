import { nowPlayingAction } from '@/core/ actions/movies/now-playing.action';
import { popularMoviesAction } from '@/core/ actions/movies/popular.action';
import { topRatedMoviesAction } from '@/core/ actions/movies/top-rated.action';
import { upcomingMoviesAction } from '@/core/ actions/movies/upcoming.action';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useMovies = () => {
  // Queries
  const nowPlayingQuery = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: nowPlayingAction,
    staleTime: 1000 * 60 * 60 * 24, // 24horas
  });

  const popularQuery = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: popularMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24horas
  });

  // infinite scroll
  const topRatedQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['movies', 'top-rated'],
    queryFn: ({ pageParam }) => {
      console.log({ pageParam });
      return topRatedMoviesAction({ page: pageParam })
    },
    staleTime: 1000 * 60 * 60 * 24, // 24horas
    getNextPageParam: (lastPage, pages) => pages.length + 1
  });
  // [[movie, movie, movie], [movie, movie, movie], [movie, movie, movie], ...]  esto es lo que tiene pages

  const upcomingQuery = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: upcomingMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24horas
  });

  return {
    nowPlayingQuery,
    popularQuery,
    topRatedQuery,
    upcomingQuery,
  };
};
