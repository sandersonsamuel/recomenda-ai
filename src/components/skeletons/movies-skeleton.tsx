"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

export const MoviesContentSkeleton = () => {
  return (
    <>
      {/* Movies Skeleton desktop */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="hidden sm:flex flex-wrap justify-center items-center gap-3 px-5"
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <Skeleton className="w-[200px] h-[300px] sm:w-[170px] sm:h-[245px] p-2 bg-card rounded-md border-2" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-10 bg-card" />{" "}
              <Skeleton className="h-4 w-4 rounded-full bg-card" />{" "}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Movies Skeleton mobile */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="sm:hidden flex justify-center p-3"
      >
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="min-w-[200px] min-h-[290px] p-2 bg-card rounded-md border-2" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-10 bg-card" />
            <Skeleton className="h-4 w-4 rounded-full bg-card" />
          </div>
        </div>
      </motion.div>
    </>
  );
};
