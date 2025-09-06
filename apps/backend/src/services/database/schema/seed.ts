import prisma from "../prisma.init";

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create Users
  const user1 = await prisma.user.create({
    data: {
      username: "kennedy",
      email: "kennedy@example.com",
      password: "hashed_password_123", // <- hash in real app!
      role: "admin",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "alice",
      email: "alice@example.com",
      password: "hashed_password_456",
    },
  });

  // 2. Create Schedules (array-of-arrays or pattern string)
  await prisma.schedule.create({
    data: {
      userId: user1.id,
      pattern: [[1, 0, 1], [0, 1, 0], [1, 1, 1]], // stored as JSONB
    },
  });

  await prisma.schedule.create({
    data: {
      userId: user2.id,
      pattern: "101|010|111", // stored as string inside JSONB
    },
  });

  // 3. Create Streams
  const stream1 = await prisma.stream.create({
    data: {
      userId: user1.id,
      title: "Weekly Standup",
      description: "Team meeting to discuss weekly progress",
      url: "https://example.com/stream/weekly-standup",
      isLive: true,
    },
  });

  const stream2 = await prisma.stream.create({
    data: {
      userId: user2.id,
      title: "Product Demo",
      description: "Live demo of the new feature",
      url: "https://example.com/stream/product-demo",
      isLive: false,
    },
  });

  // 4. Create Attendance Records
  await prisma.attendance.create({
    data: {
      userId: user2.id,
      streamId: stream1.id,
      joinedAt: new Date(),
    },
  });

  await prisma.attendance.create({
    data: {
      userId: user1.id,
      streamId: stream2.id,
      joinedAt: new Date(),
      leftAt: new Date(Date.now() + 1000 * 60 * 30), // left after 30 mins
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
