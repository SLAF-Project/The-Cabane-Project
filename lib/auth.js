import prisma from "./prisma.ts";
import jwt from "jsonwebtoken";

export const checkAuth = async (request) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return false;
  }
  const token = authorization.replace(/^Bearer\s/, "");

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    if (!id) {
      return false;
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};

export const checkOwner = async (request) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return false;
  }
  const token = authorization.replace(/^Bearer\s/, "");
  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user.isowner) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};

export const checkIfOwnerIsMe = async (request, id) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return false;
  }
  const token = authorization.replace(/^Bearer\s/, "");
  try {
    const user_id = jwt.verify(token, process.env.JWT_KEY).id;
    if (user_is !== id) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};
