import type { App } from '@slack/bolt';
import openMenuAction from './open-menu-action';

const register = (app: App) => {
  app.action('open_menu_action_id', openMenuAction);
};

export default { register };
