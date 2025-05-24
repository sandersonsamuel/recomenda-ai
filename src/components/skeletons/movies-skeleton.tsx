"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

export const MoviesContentSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="flex flex-col gap-3"
    >
      <div className="flex gap-3 items-center justify-center">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex flex-wrap flex-col items-center gap-2"
          >
            <Skeleton className="sm:w-[200px] h-auto md:w-[170px] md:h-[245px] p-2 bg-card rounded-md border-2 hover:scale-105 transition-transform" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-10 bg-card" />
              <Skeleton className="h-4 w-4 rounded-full bg-card" />{" "}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
