import { CacheOptions } from "@m4x1m1l14n/cache";

const CACHE_OPTIONS: CacheOptions =
{
    resolution: 1000,
    defaultTTL: 1800000,
    maxItems: 2
};

const DATE_FORMAT = 'YYYY-MM-DD';
const SOURCE = 'https://www.menicka.cz/praha-7.html';
const RELEVANT_RESTAURANTS_LIST =
    [
        'stereo',
        'letensky-tulipan',
        'ztraceny-raj',
        'restaurace-na-melniku',
        'creperie-u-slepe-kocicky',
        'klub-avu',
        'bar-cobra',
        'bistro-8',
        'vegtral-restaurace-bar',
        'garuda-restaurant',
        'fraktal',
        'peperoncino',
        'u-houbare',
        'kavarna-muzeum',
        'belcredi-bistro-&-bar',
        'domazlicka-jizba',
        'u-pivoje',
        'mama-shelter-prague',
        'stejkarna-holesovice'
    ]

const EMOJI_MAP = new Map<string, string>([
    ["radio", "stereo"],
    ["cat", "creperie-u-slepe-kocicky"],
    ["cat2", "creperie-u-slepe-kocicky"],
    ["catjam", "creperie-u-slepe-kocicky"],
    ["cat_lsd", "creperie-u-slepe-kocicky"],
    ["cat_standing", "creperie-u-slepe-kocicky"],
    ["probing_cane", "creperie-u-slepe-kocicky"],
    ["mrs-mon-house", "mon-house"],
    ["mr_garuda", "garuda"],
    ["mr-masala", "masala"],
    ["cheese_wedge", "syr"],
    ["hamburger", "burger"],
    ["fries", "hranolky"],
    ["tulip", "letensky-tulipan"],
    ["cut_of_meat", "stejkarna-holesovice"],
    ["avu", "klub-avu"],
    ["art", "klub-avu"],
    ["beer", "u-pivoje"],
    ["mushroom", "u-houbare"],
    ["snake", "bar-cobra"],
    ["broccoli", "vegtral-restaurace-bar"],
]);

export { CACHE_OPTIONS, DATE_FORMAT, SOURCE, RELEVANT_RESTAURANTS_LIST, EMOJI_MAP };
