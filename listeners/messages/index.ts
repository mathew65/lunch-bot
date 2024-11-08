import type { App, SayArguments } from '@slack/bolt';
import { findInMenus, getData } from '../../data';
import { getRestaurantMenu, getSearchResults } from '../../blocks';
import { EMOJI_MAP } from '../.././constants';
import { SeachType } from '../../types'

const register = (app: App) => {
  
app.message(/((:?)([\u00BF-\u1FFF\u2C00-\uD7FF\w-_]*)(:?))/i, async ({ context, say }) => {
  let requestedName: string | null = context.matches[3] || null;
  const data = await getData();
  if (!data || data?.length < 1) return;
  if (!requestedName) return;
  if (requestedName && data) {
    let result = await findInMenus({ type: SeachType.restaurant, value: EMOJI_MAP.get(requestedName) ?? requestedName}, data);
    if(result.length === 1) {
      await say(getRestaurantMenu(result[0].item));
    }
      else{
        result = await findInMenus({ type: SeachType.menu, value: EMOJI_MAP.get(requestedName) ?? requestedName}, data);
        if(result.length > 0) {
          await say(getSearchResults(result) as SayArguments);
        }
    }
  }
});
};

export default { register };
