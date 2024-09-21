import {
    boolean,
    integer,
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

export const Player = pgTable("player", {
    id: serial("id").primaryKey(),
    email: varchar("email"),
    name: varchar("name"),
    image: varchar("image"),
    createdAt: varchar("createdAt"),
    points: integer("points"),
    username: varchar("username")
});

export const UserSubscription = pgTable("userSubscription", {
    id: serial("id").primaryKey(),
    email: varchar("email"),
    username: varchar("username"),
    active: boolean("active"),
    paymentId: varchar("paymentId"),
    joinDate: varchar("joinDate"),
});