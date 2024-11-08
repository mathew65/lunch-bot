import dayjs from "dayjs";
import { DATE_FORMAT, SOURCE, CACHE_OPTIONS, RELEVANT_RESTAURANTS_LIST } from "./constants";
import Fuse from "fuse.js";
import { Cache } from '@m4x1m1l14n/cache';
import { parse } from 'node-html-parser';
import removeAccents from 'remove-accents';
import { MenuItem, Restaurant, SeachType, Search } from "./types";

const getData = async (): Promise<Restaurant[] | null> => {
  const cache = new Cache<string, string>(CACHE_OPTIONS);
  const dateKey = dayjs().format(DATE_FORMAT);
  const cached = cache.has(dateKey);
  try {
    if (!cached) {
      cache.delete(dayjs().subtract(1, 'day').format(DATE_FORMAT));
      const data = await fetch(SOURCE)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          const decoder = new TextDecoder("windows-1250");
          return decoder.decode(buffer);
        });
      cache.set(dateKey, data);
    }
    const restaurantsData = cache.get(dateKey);
    if (!restaurantsData) return null;
    const root = parse(restaurantsData);
    const menickaDetails = root.querySelectorAll('.menicka_detail');
    const res = menickaDetails.map((e) => {
      const name = e.querySelector('.nazev')?.text.trim();
      const polevka = e.querySelector('.menicka .polevka')?.text.trim();
      if (
        polevka === 'Pro tento den nebylo zadáno polední menu.' ||
        polevka === 'Restaurace má tento den zavřeno.' ||
        name === undefined) {
        return null;
      }
      const id = removeAccents(name)?.replace(/\s/g, '-').toLowerCase();
      const menuItems = e.querySelectorAll('.nabidka_1, .nabidka_2');
      const menu = menuItems.map((item) => {
        const jidlo = item.text.trim();
        const cena = item.nextElementSibling?.text.trim();
        return { jidlo: jidlo, cena: cena } as MenuItem;
      });
      return { id: id, name: name, menu: menu };
    }).filter((e) => e !== null && RELEVANT_RESTAURANTS_LIST.includes(e.id)) as Restaurant[];
    return res;

  } catch (error: any) {
    console.error(error, error.message);
    return null;
  }
}

const findInMenus = async (requested: Search, data: Restaurant[]) => {
  if (!data || data?.length < 1) return [];
  const fuse = new Fuse(data, {
    shouldSort: true,
    minMatchCharLength: 3,
    keys: requested.type === SeachType.restaurant ? [
      "id",
      "name",
    ] : [
      "menu.jidlo"
    ],
    threshold: requested.type === SeachType.restaurant ? 0.2 : 0.5,
    includeMatches: true,
    findAllMatches: true,
    includeScore: true,
  });
  const results = fuse.search(requested.value);
  return results;
}

const getFullMenu = async (restaurantId?: string) => {
  if (!restaurantId) return null;
  const data = await getData();
  if (!data || data?.length < 1) return null;
  const map = new Map(data.map((obj) => [obj.id, obj]));
  return map.get(restaurantId) ?? null;
}

export { getData, findInMenus, getFullMenu };