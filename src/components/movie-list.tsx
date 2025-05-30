"use client";

import { Movie } from "@/@types/movies.type";
import { moviesStore } from "@/store/movies.store";
import toast from "react-hot-toast";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSnapshot } from "valtio";
import { MovieCard } from "./movie-card";
import { MovieSkeleton } from "./skeletons/movies-skeleton";
import { useEffect } from "react";

export const MovieList = () => {
  const { movies, lastQuery, loading, error } = useSnapshot(moviesStore);

  useEffect(() => {
    if (error && lastQuery && !loading && movies.length === 0) {
      toast.error(error);
    }
  }, [error, lastQuery, loading, movies.length]);

  if (movies.length === 0 && !loading) {
    return (
      <h3 className="text-gray-200 text-justify sm:text-center text-sm sm:text-md md:text-xl max-w-4xl sm:mx-3 md:mx-0">
        Descubra seu próximo filme favorito! Diga-nos o que você gosta e
        ajudaremos a encontrar as melhores sugestões para você.
      </h3>
    );
  }

  if (loading) {
    return <MovieSkeleton />;
  }

  if (movies.length > 0 && !loading) {
    return (
      <div className="flex flex-col gap-3">
        <p className="sm:text-xl text-start sm:text-center text-gray-200">
          Resultados para: {lastQuery}
        </p>

        <div className="hidden sm:flex flex-wrap justify-center items-center gap-3 px-5">
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div className="w-full sm:hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={"auto"}
            loop={true}
            className="max-w-[240px] sm:max-w-[400px] md:max-w-[700px] lg:max-w-[930px] xl:max-w-[1200px] h-full"
          >
            {movies.map((movie: Movie) => (
              <SwiperSlide
                key={movie.id}
                className="flex justify-center items-center h-full"
              >
                <MovieCard key={movie.id} movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
};
