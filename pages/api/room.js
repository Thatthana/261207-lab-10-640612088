import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();
  res.status(200).json({
    ok: true,
    room: rooms.map((x) => {
      return { roomId: x.roomId, roomName: x.roomName };
    }),
  });
}
