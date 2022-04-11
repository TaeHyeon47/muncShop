import bcrypt from "bcryptjs";

const users = [
  {
    name: "김관리",
    email: "admin@example.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "이현아",
    email: "hyuna@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    name: "서보경",
    email: "bokyoung@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    name: "조현영",
    email: "hyunyoung@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

export default users;
