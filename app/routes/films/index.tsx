import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import type { Film } from "~/api/films";
import { getFilms } from "~/api/films";

//server side
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  return getFilms(title);
};

export const meta: MetaFunction = () => {
  return { title: "Films | Movie Studio", description: "List of Films" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "styles" }];
};

export default function FilmsIndex() {
  const films = useLoaderData<Film[]>();
  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center mb-2">
        Studio Ghibli Films
      </h1>

      <Form reloadDocument method="get" className="py-5">
        <label className="font-bold">
          Search{" "}
          <input
            type="text"
            name="title"
            placeholder="Type a title"
            className="border-2 rounded px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded px-4 mx-2"
        >
          Search
        </button>
      </Form>
      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <Link
            title={film.title}
            key={film.id}
            to={film.id}
            className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
            prefetch="none"
          >
            <div>{film.title}</div>
            <img src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}
