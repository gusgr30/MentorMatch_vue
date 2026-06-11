import { ESTADOS_RESERVA } from "../constants/index.js";

export const reservas = [
  {
    reservaGuardada: {
      _id: "r1",
      studentId: "u1",
      mentorId: "m1",
      fechaHora: "2026-06-16T18:00:00",
      slot: "Jueves 18:00",
      estado: ESTADOS_RESERVA.PENDIENTE,
      urlZoom: null,
    },
    studentObj: { nombre: "Juan Pérez" },
    mentorObj: { nombre: "Alejandra Pérez" },
  },
  {
    reservaGuardada: {
      _id: "r2",
      studentId: "u1",
      mentorId: "m2",
      fechaHora: "2026-06-17T10:00:00",
      slot: "Viernes 10:00",
      estado: ESTADOS_RESERVA.CONFIRMADA,
      urlZoom: "https://zoom.us/j/123456789",
    },
    studentObj: { nombre: "Juan Pérez" },
    mentorObj: { nombre: "Marcos Galperin" },
  },
  {
    reservaGuardada: {
      _id: "r3",
      studentId: "u1",
      mentorId: "m3",
      fechaHora: "2026-06-18T09:00:00",
      slot: "Martes 09:00",
      estado: ESTADOS_RESERVA.CANCELADA,
      urlZoom: null,
    },
    studentObj: { nombre: "Juan Pérez" },
    mentorObj: { nombre: "Julia Torres" },
  },
];
