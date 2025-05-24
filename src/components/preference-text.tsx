"use client";

import { Textarea } from "@/components/ui/textarea";
import { moviesStore } from "@/store/movies.store";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { getMoviesByPreference } from "../actions/get-movies-by-preference";

export const PreferenceText = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { loading, movies } = useSnapshot(moviesStore);

  useEffect(() => {
    if (textAreaRef.current) {
      focusTextArea();
    }
  }, [textAreaRef.current]);

  const focusTextArea = () => {
    textAreaRef.current?.focus();
  };

  const onSubmit = async (formData: FormData) => {
    moviesStore.loading = true;
    const movies = await getMoviesByPreference(formData);
    moviesStore.lastQuery = formData.get("userPreferences") as string;
    moviesStore.movies = movies;
    moviesStore.loading = false;
  };

  return (
    <form
      action={onSubmit}
      className="w-full sm:w-auto sm:min-w-[600px] md:min-w-[700px] flex flex-col gap-3"
    >
      <motion.span
        initial={{ height: movies.length === 0 ? 140 : 100 }}
        animate={{ height: movies.length === 0 ? 140 : 100 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        onClick={focusTextArea}
        className={"bg-card border-2 rounded-lg p-3"}
      >
        <Textarea
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          disabled={loading}
          name="userPreferences"
          ref={textAreaRef}
          className={`w-full h-full min-h-0
          border-0 ring-0 outline-none focus-visible:ring-0 focus-visible:border-0 resize-none p-0 disabled:animate-pulse`}
          placeholder="Descreva o que você quer assistir"
        />
      </motion.span>
    </form>
  );
};
