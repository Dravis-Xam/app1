import { Router } from "express";
import { withRole } from "../../../middleware/authorize.mid";
import verifyToken from "../../../middleware/verifyToken.mid";
import { PrismaClient } from "@prisma/client";

const router = Router();

// Get all streams
const getAllStreams = async (req: any, res: any) => {
  try {
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const streams = await prisma.stream.findMany({
      include: { user: true, attendances: true },
    });
    res.json(streams);
  } catch (err) {
    res.status(500).json({ message: "Error fetching streams", error: err });
  }
};

// Get single stream by ID
const getStreamById = async (req: any, res: any) => {
  try {
    const streamId = Number(req.params.id);
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const stream = await prisma.stream.findUnique({
      where: { id: streamId },
      include: { user: true, attendances: true },
    });
    if (!stream) return res.status(404).json({ message: "Stream not found" });
    res.json(stream);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stream", error: err });
  }
};

// Create new stream
const createStream = async (req: any, res: any) => {
  try {
    const streamData = req.body;
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const newStream = await prisma.stream.create({ data: streamData });
    res.status(201).json(newStream);
  } catch (err) {
    res.status(500).json({ message: "Error creating stream", error: err });
  }
};

// Update stream
const updateStream = async (req: any, res: any) => {
  try {
    const streamId = Number(req.params.id);
    const streamData = req.body;
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const updatedStream = await prisma.stream.update({
      where: { id: streamId },
      data: streamData,
    });
    res.json(updatedStream);
  } catch (err) {
    res.status(500).json({ message: "Error updating stream", error: err });
  }
};

// Delete stream
const deleteStream = async (req: any, res: any) => {
  try {
    const streamId = Number(req.params.id);
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const deletedStream = await prisma.stream.delete({ where: { id: streamId } });
    res.json(deletedStream);
  } catch (err) {
    res.status(500).json({ message: "Error deleting stream", error: err });
  }
};

const search = async (req: any, res: any) => {
  try {
    const { query } = req.query;
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const streams = await prisma.stream.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
            { tags: { has: query } },
        ],
      },
      include: { user: true, attendances: true },
    });
    res.json(streams);
  } catch (err) {
    res.status(500).json({ message: "Error searching streams", error: err });
  }
};

// Routes
router.get("/streams", withRole("admin"), getAllStreams);
router.get("/streams/:id", verifyToken, getStreamById);
router.post("/streams", verifyToken, createStream);
router.put("/streams/:id", verifyToken, updateStream);
router.delete("/streams/:id", withRole("admin"), deleteStream);
router.get("/streams/search", verifyToken, search);

export default router;
