import { conversation } from "./conversation";

type ResponseId = (typeof conversation)[number]["lessons"][number]["id"];

const responseAudio: Record<ResponseId, number> = {
  greeting: require("../assets/audio/dialogue-greeting.mp3"),
  "introduce-yourself": require("../assets/audio/dialogue-introduce-yourself.mp3"),
  "order-tea": require("../assets/audio/dialogue-order-tea.mp3"),
  "thank-server": require("../assets/audio/dialogue-thank-server.mp3"),
  "find-station": require("../assets/audio/dialogue-find-station.mp3"),
  "ask-train-destination": require("../assets/audio/dialogue-train-destination.mp3"),
  "buy-one-ticket": require("../assets/audio/dialogue-one-ticket.mp3"),
  "shop-ask-price": require("../assets/audio/dialogue-shop-price.mp3"),
  "shop-take-item": require("../assets/audio/dialogue-shop-take-item.mp3"),
  "shop-card-payment": require("../assets/audio/dialogue-shop-card-payment.mp3"),
  "help-repeat": require("../assets/audio/dialogue-help-again.mp3"),
  "help-slowly": require("../assets/audio/dialogue-help-slowly.mp3"),
  "help-understand": require("../assets/audio/dialogue-help-understand.mp3"),
};

export const dialogueGroups = conversation.map((group) => ({
  ...group,
  lessons: group.lessons.map((lesson) => ({
    ...lesson,
    answerAudio: responseAudio[lesson.id],
  })),
}));
