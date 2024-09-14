import {
    boolean,
    json,
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";

export const Course = pgTable("course", {
    id: serial("id").primaryKey(),
    courseId: varchar("courseId").notNull(),
    courseName: varchar("courseName"),
    courseTitle: varchar("courseTitle"),
    level: varchar("level"),
    courseOutput: json("courseOutput"),
    createdBy: varchar("createdBy"),
    createdAt: varchar("createdAt"),
    username: varchar("username"),
    userProfileImage: varchar("userProfileImage"),
    courseBanner: varchar('courseBanner')
});