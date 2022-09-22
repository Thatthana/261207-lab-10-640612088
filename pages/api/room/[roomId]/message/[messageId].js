import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const rooms = readDB();
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  const roomsId = rooms.find((x) => x.roomId === roomId);
  const roomsIdx = rooms.findIndex((x) => x.roomId === roomId);

  if (req.method === "DELETE") {
    if (roomsIdx !== -1) {
      const messageIdx = roomsId.messages.findIndex(
        (x) => x.messageId === messageId
      );
      if (messageIdx === -1) {
        res.status(404).json({ ok: false, message: "Invalid message id" });
      } else {
        roomsId.messages.splice(messageIdx, 1);
        res.status(200).json({ ok: true });
      }
    } else {
      res.status(404).json({ ok: false, message: "Invalid room id" });
    }
  }
}
