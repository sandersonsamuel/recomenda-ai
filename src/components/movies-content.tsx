"use client";

import { Movie } from "@/@types/movies.type";
import { moviesStore } from "@/store/movies.store";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSnapshot } from "valtio";
import { MoviesCard } from "./movies-card";
import { MoviesContentSkeleton } from "./skeletons/movies-skeleton";

export const MoviesContent = () => {
  const { movies, lastQuery, loading } = useSnapshot(moviesStore);
  const realMovies = movies.filter((movie) => !!movie);

  if (movies.length === 0 && !loading) {
    return (
      <h3 className="text-justify sm:text-center text-sm sm:text-md md:text-xl max-w-4xl sm:mx-3 md:mx-0">
        Descubra seu próximo filme favorito! Diga-nos o que você gosta e
        ajudaremos a encontrar as melhores sugestões para você.
      </h3>
    );
  }

  if (loading) {
    return <MoviesContentSkeleton />;
  }

  if (movies.length > 0 && !loading) {
    return (
      <div className="flex flex-col gap-3">
        <p className="sm:text-xl text-start sm:text-center">
          Resultados para: {lastQuery}
        </p>

        <div className="hidden sm:flex flex-wrap justify-center items-center gap-3 px-5">
          {realMovies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie as Movie} />
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
            {realMovies.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className="flex justify-center items-center h-full"
              >
                <MoviesCard key={movie.id} movie={movie as Movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
};
