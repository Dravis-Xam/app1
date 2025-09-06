import { Router } from "express";
import { withRole } from "../../../middleware/authorize.mid";
import verifyToken from "../../../middleware/verifyToken.mid";
import { PrismaClient } from "@prisma/client";

const router = Router();

// Get all schedules
const getAllSchedules = async (req: any, res: any) => {
  try {
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const schedules = await prisma.schedule.findMany({
      include: { user: true },
    });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Error fetching schedules", error: err });
  }
};

// Get schedule by ID
const getScheduleById = async (req: any, res: any) => {
  try {
    const scheduleId = Number(req.params.id);
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { user: true },
    });
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: "Error fetching schedule", error: err });
  }
};

// Create new schedule
const createSchedule = async (req: any, res: any) => {
  try {
    const scheduleData = req.body;
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const newSchedule = await prisma.schedule.create({ data: scheduleData });
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json({ message: "Error creating schedule", error: err });
  }
};

// Update schedule
const updateSchedule = async (req: any, res: any) => {
  try {
    const scheduleId = Number(req.params.id);
    const scheduleData = req.body;
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const updatedSchedule = await prisma.schedule.update({
      where: { id: scheduleId },
      data: scheduleData,
    });
    res.json(updatedSchedule);
  } catch (err) {
    res.status(500).json({ message: "Error updating schedule", error: err });
  }
};

// Delete schedule
const deleteSchedule = async (req: any, res: any) => {
  try {
    const scheduleId = Number(req.params.id);
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");
    const deletedSchedule = await prisma.schedule.delete({ where: { id: scheduleId } });
    res.json(deletedSchedule);
  } catch (err) {
    res.status(500).json({ message: "Error deleting schedule", error: err });
  }
};

// Search schedules (by username/email of user OR by pattern string match)
const searchSchedules = async (req: any, res: any) => {
  try {
    const { query } = req.query;
    const { prisma }: PrismaClient = await import("../../../services/database/prisma.init");

    const schedules = await prisma.schedule.findMany({
      where: {
        OR: [
          {
            user: {
              OR: [
                { username: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
              ],
            },
          },
          // Only works if your pattern is stored as string instead of nested arrays
          { pattern: { equals: query } },
        ],
      },
      include: { user: true },
    });

    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Error searching schedules", error: err });
  }
};

// Routes
router.get("/schedules", withRole("admin"), getAllSchedules);
router.get("/schedules/:id", verifyToken, getScheduleById);
router.post("/schedules", verifyToken, createSchedule);
router.put("/schedules/:id", verifyToken, updateSchedule);
router.delete("/schedules/:id", withRole("admin"), deleteSchedule);
router.get("/schedules/search", verifyToken, searchSchedules);

export default router;
