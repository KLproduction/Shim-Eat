"use server";

import { db } from "@/lib/db";

export const generateDummyUserToDB = async () => {
  try {
    const generateDummyUser = () => {
      const firstNames = [
        "James",
        "Mary",
        "John",
        "Patricia",
        "Robert",
        "Jennifer",
        "Michael",
        "Linda",
        "William",
        "Elizabeth",
      ];
      const lastNames = [
        "Smith",
        "Johnson",
        "Williams",
        "Brown",
        "Jones",
        "Garcia",
        "Miller",
        "Davis",
        "Rodriguez",
        "Martinez",
      ];
      const domains = [
        "example.com",
        "test.com",
        "demo.com",
        "sample.com",
        "placeholder.com",
      ];

      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const domain = domains[Math.floor(Math.random() * domains.length)];

      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;

      return {
        name: `${firstName} ${lastName}`,
        email: email,
      };
    };
    const dummyUser = generateDummyUser();
    await db.user.create({
      data: {
        name: dummyUser.name,
        email: dummyUser.email,
        emailVerified: new Date(),
      },
    });

    return { success: "Dummy user created." };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong!" };
  }
};
