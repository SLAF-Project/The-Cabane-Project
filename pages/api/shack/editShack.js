import { checkAuth, checkIfOwnerIsMe } from "../../../lib/auth";
import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {

  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const isTheOwner = await checkIfOwnerIsMe(req, req.body.ownerId);
  if (!isTheOwner) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const data = req.body;

  try {
    const result = await prisma.cabane.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while updating." });
  }
};
