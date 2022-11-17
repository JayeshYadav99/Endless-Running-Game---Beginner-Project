export function drawstatustext(context, input,player) {
  context.font = "28px Helvetica";
  context.fillText("Last Input" + input.lastkey, 20, 50);
  context.fillText("active state  "+ player.currentstate.state,20,90);

}
