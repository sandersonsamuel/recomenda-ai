"use client";

import { Textarea } from "@/components/ui/textarea";
import { moviesStore } from "@/store/movies.store";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { getMoviesByPreference } from "../actions/get-movies-by-preference";
import { SendHorizontal } from "lucide-react";

export const PreferenceDisplay = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { loading } = useSnapshot(moviesStore);

  useEffect(() => {
    if (textAreaRef.current) {
      focusTextArea();
    }
  }, [textAreaRef.current]);

  const focusTextArea = () => {
    textAreaRef.current?.focus();
  };

  const onSubmit = async (formData: FormData) => {
    const userPreferences = formData.get("userPreferences") as string;

    if (!userPreferences) {
      return;
    }

    moviesStore.loading = true;
    const movies = await getMoviesByPreference(userPreferences);
    if (movies.length === 0)
      moviesStore.error =
        "Nenhum filme encontrado. Mude suas preferências, ou tente novamente mais tarde.";
    moviesStore.lastQuery = userPreferences;
    moviesStore.movies = movies;
    moviesStore.loading = false;
  };

  return (
    <form
      action={onSubmit}
      className="w-full sm:w-auto sm:min-w-[600px] md:min-w-[700px] flex flex-col gap-3"
    >
      <motion.div className="bg-card border-2 rounded-lg p-3 flex flex-col">
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
          className={`flex-grow border-0 ring-0 outline-none focus-visible:ring-0 focus-visible:border-0 resize-none p-0 disabled:animate-pulse`}
          placeholder="Descreva o que você quer assistir"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button type="submit">
            <SendHorizontal />
          </button>
        </div>
      </motion.div>
    </form>
  );
};
