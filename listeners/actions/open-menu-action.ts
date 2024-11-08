import type { AllMiddlewareArgs, BlockAction, ButtonAction, SlackActionMiddlewareArgs } from '@slack/bolt';
import { getModalView } from '../../blocks';
import { getFullMenu } from '../../data';

const openMenuAction = async ({
  action, ack, body, client, logger
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();
    const restaurantId = (<ButtonAction>action).value
    const restaurantWithFullMenu = await getFullMenu(restaurantId);
    if(!restaurantWithFullMenu) return;
    await client.views.open({
      trigger_id: (<BlockAction>body).trigger_id,
      view: getModalView(restaurantWithFullMenu),
    });
  }
  catch (error) {
    console.error(error);
  }
};

export default openMenuAction;