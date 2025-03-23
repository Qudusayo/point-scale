export const getGrade = (score: number) => {
  if (score <= 100 && score >= 70) {
    return "A";
  } else if (score <= 69 && score >= 60) {
    return "B";
  } else if (score <= 59 && score >= 50) {
    return "C";
  } else if (score <= 49 && score >= 45) {
    return "D";
  } else {
    return "F";
  }
};

const gradePoint = (score: number) => {
  if (score <= 100 && score >= 70) {
    return 4;
  } else if (score <= 69 && score >= 60) {
    return 3;
  } else if (score <= 59 && score >= 50) {
    return 2;
  } else if (score <= 49 && score >= 45) {
    return 1;
  } else {
    return 0;
  }
};

export interface CourseDetails {
  id: string;
  course_code: string;
  course_title: string;
  course_units: string;
  level_id_fk: string;
  result: string;
}

export function calculateCGPA(results: CourseDetails[]): number[] {
  let totalUnits = 0;
  let totalUnitPassed = 0;

  const totalGradePoint = results.reduce((result, course) => {
    const courseUnitPoint = parseInt(course.course_units);

    totalUnits += courseUnitPoint;
    totalUnitPassed += parseInt(course.result) >= 45 ? courseUnitPoint : 0;

    const coursePoint = gradePoint(parseInt(course.result));

    const courseGradePoint = courseUnitPoint * coursePoint;
    return result + courseGradePoint;
  }, 0);

  const scoreGP = totalGradePoint / totalUnits;

  const cgpa = Math.round((scoreGP + Number.EPSILON) * 100) / 100;

  return [totalUnits, totalUnitPassed, totalGradePoint, cgpa];
}
