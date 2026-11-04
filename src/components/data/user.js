
export const users = [
  {
    id: 1,
    name: "Professor Rahul",
    email: "professor1@example.com",
    role: "admin",
  },
  {
    id: 2,
    name: "Professor Priya",
    email: "professor2@example.com",
    role: "admin",
  },
  {
    id: 3,
    name: "Kajal",
    email: "student1@example.com",
    role: "student",
  },
  {
    id: 4,
    name: "Aman",
    email: "student2@example.com",
    role: "student",
  },
  {
    id: 5,
    name: "Neha",
    email: "student3@example.com",
    role: "student",
  },
  {
    id: 6,
    name: "Rohit",
    email: "student4@example.com",
    role: "student",
  },
  {
    id: 7,
    name: "Anjali",
    email: "student5@example.com",
    role: "student",
  },
];

export const students = users.filter(
  (user) => user.role === "student"
);

export const admins = users.filter(
  (user) => user.role === "admin"
);
