import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const barbers = sqliteTable('barbers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  phone: text('phone'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const photos = sqliteTable('photos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  barberId: integer('barber_id').notNull().references(() => barbers.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  title: text('title'),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const availabilities = sqliteTable('availabilities', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  barberId: integer('barber_id').notNull().references(() => barbers.id, { onDelete: 'cascade' }),
  dayOfWeek: integer('day_of_week').notNull(), // 0 = dimanche, 1 = lundi, etc.
  startTime: text('start_time').notNull(), // Format HH:mm
  endTime: text('end_time').notNull(), // Format HH:mm
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

export const appointments = sqliteTable('appointments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  barberId: integer('barber_id').notNull().references(() => barbers.id, { onDelete: 'cascade' }),
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email').notNull(),
  clientPhone: text('client_phone'),
  appointmentDate: integer('appointment_date', { mode: 'timestamp' }).notNull(),
  status: text('status').notNull().default('pending'), // pending, confirmed, cancelled, completed
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});
