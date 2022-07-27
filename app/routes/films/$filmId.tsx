import type { LoaderFunction } from "@remix-run/node";
import type * as films from "~/api/films";
import { getFilmById } from "~/api/films";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, "expected params.filmId");
  const film = await getFilmById(params.filmId);
  return film;
};

export default function Film() {
  const film = useLoaderData<films.Film>();
  return <div>{film.title}</div>;
}
