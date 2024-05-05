type User = {
    id: string;
    name: string;
}

type Role = "student" | "teacher";

type Rate =  1 | 2 | 3 | 4 | 5;

type Level =  "junior" | "middle" | "senior";

type Course = {
    id: number;
    title: string;
    role: Role;
    rate: Rate;
    level: Level;
}

/* --- */

type Student = User & { courses: { [id: number]: Omit<Course, "role"> & { role: Exclude<Role, "teacher">} } };

type Teacher = Omit<User, "courses">;

type Director = Omit<User, "courses"> & { students: { [id: string]: Student }, teachers: { [id: string]: Teacher } };

/*--  Проверка  --*/
const s1: Student = {
    id: "s1",
    name: "s1",
    courses: {
        [1]: {
            id: 1,
            title: "First",
            rate: 5,
            role: "student",
            level: "middle"
        }
    },
};

const t1: Teacher = {
    id: "t1",
    name: "t1",
};

const d1: Director = {
    id: "d1",
    name: "d1",
    students: {
        ["s1"]: s1,
        ["s2"]: {
            id: "s2",
            name: "s2",
            courses: {
                [2]: {
                    id: 2,
                    title: "Second",
                    rate: 4,
                    role: "student",
                    level: "middle"
                }
            },
        }
    },
    teachers: {
        ["t1"]: {
            id: "t1",
            name: "t1",
        },
        ["t2"]: {
            id: "t2",
            name: "t2",
        }
    }
};
