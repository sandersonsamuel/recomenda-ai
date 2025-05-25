import { Movie } from "@/@types/movies.type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import "swiper/css";

type Props = {
  movie: Movie;
};

export const MoviesCard = ({ movie }: Props) => {
  return (
    <Dialog key={movie.id}>
      <DialogTrigger>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          title={movie.title}
          className="w-[200px] h-[245px] sm:w-[170px] p-2 bg-card rounded-md border-2 hover:scale-105 transition-transform"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <span className="flex justify-center items-center mt-2 gap-1">
          <p className="text-sm text-muted-foreground">
            {movie.vote_average.toFixed(1)}/10
          </p>
          <Star size={16} className="text-primary" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">
            {movie.title} - ({movie.release_date.slice(0, 4)})
          </DialogTitle>
          <DialogDescription className="text-justify">
            {movie.overview}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
