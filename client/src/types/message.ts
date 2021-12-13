export type Message = {
  id: string,
  email: string,
  content: string,
  timestamp: number,
};

export type NewMessage = Omit<Message, "id">;

export interface MessageProps extends Omit<Message, "id" | "timestamp"> {
  dir: string;
  timestamp: string;
}