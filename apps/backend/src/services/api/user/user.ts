import { Router } from "express";
import { withRole } from "../../../middleware/authorize.mid";
import verifyToken from "../../../middleware/verifyToken.mid";
import { PrismaClient } from "@prisma/client";

const router = Router();

const getAllUsers = (req: any, res: any) => {
  // Logic to get all users
  const users = import("../../../services/database/prisma.init").then(({ prisma }: typeof PrismaClient) => prisma.user.findMany());
  res.json(users);
}

const getUserById = (req:any, res:any) => {
  const userId = req.params.id;
    // Logic to get user by ID
  const user = import("../../../services/database/prisma.init").then(({ prisma }: typeof PrismaClient) => prisma.user.findUnique({ where: { id: userId } }));
    res.json(user);
}

const createUser = (req:any, res:any) => {
  const userData = req.body;
    // Logic to create a new user
    const newUser = import("../../../services/database/prisma.init").then(({ prisma }: typeof PrismaClient) => prisma.user.create({ data: userData }));
    res.status(201).json(newUser);
}

const updateUser = (req:any, res:any) => {
  const userId = req.params.id;
  const userData = req.body;
    // Logic to update user by ID
    res.send(`Update user with ID: ${userId}`);
    const updatedUser = import("../../../services/database/prisma.init").then(({ prisma }: typeof PrismaClient) => prisma.user.update({ where: { id: userId }, data: userData }));
    res.json(updatedUser);
}

const deleteUser = (req:any, res:any) => {
  const userId = req.params.id;
    // Logic to delete user by ID
    res.send(`Delete user with ID: ${userId}`);
    const deletedUser = import("../../../services/database/prisma.init").then(({ prisma }: typeof PrismaClient) => prisma.user.delete({ where: { id: userId } }));
    res.json(deletedUser);
}

const search = async (req: any, res: any) => {
  try {
    const { query } = req.query;
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const users = await prisma.user.findMany({
      where: {
        OR: [
            { username: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error searching users", error: err });
  } 
};

router.get("/users", withRole("admin"), getAllUsers);
router.get("/users/:id", withRole("admin"), getUserById);
router.post("/users", withRole("admin"), createUser);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);
router.get("/users/search", verifyToken, search);

export default router;