type User = {
    id: string;
    name: string;
}

type Course = {
    id: number;
    title: string;
}

type WithRate = {
    rate: 1 | 2 | 3 | 4 | 5;
}

type WithStudentRole = {
    role: "student"
}

type WithTeacherRole = {
    role: "teacher"
}

type WithLevel = {
    level: "junior" | "middle" | "senior"
}

/* --- */

type StudentCourse = Course & WithStudentRole & WithRate & WithLevel;
type Student = User & { courses: { [id: number]: StudentCourse } };

type TeacherCourse = Course & WithTeacherRole & WithLevel;
type Teacher = User & { courses: { [id: number]: TeacherCourse } };

type Director = User & {
    students: { [id: string]: Pick<Student, "id" | "name"> };
    teachers: { [id: string]: Pick<Teacher, "id" | "name" | "level" | "rate"> };
};

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
}

const t1: Teacher = {
    id: "t1",
    name: "t1",
    courses: {
        [5]: {
            id: 5,
            title: "Fifth",
            role: "teacher",
            level: "junior"
        },
        [1]: {
            ...s1.courses[1],
            role: "teacher"
        }
    }
}

const d1: Director = {
    id: "d1",
    name: "d1",
    students: {
        ["s1"]: {
            id: s1.id,
            name: s1.name
        },
        ["s2"]: {
            id: "s2",
            name: "s2"
        }
    },
    teachers: {
        ["t1"]: {
            id: t1.id,
            name: t1.name,
            level: t1.level,
            rate: t1.courses[1].rate // Вот так можно получить оценку учителя из курса
        },
        ["t2"]: {
            id: "t2",
            name: "t2",
            level: "senior",
            rate: 5
        }
    }
}
