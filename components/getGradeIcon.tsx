import {
  HexagonLetterA,
  HexagonLetterB,
  HexagonLetterC,
  HexagonLetterD,
  HexagonLetterE,
  HexagonLetterF,
} from './icons';
import Text from './text';

export const GetGradeIcon = ({
  grade,
  width = 32,
  height = 32,
}: {
  grade: string;
  width?: number;
  height?: number;
}) => {
  switch (grade) {
    case 'A':
      return <HexagonLetterA width={width} height={height} fill="#00C853" />;
    case 'B':
      return <HexagonLetterB width={width} height={height} fill="#2196F3" />;
    case 'C':
      return <HexagonLetterC width={width} height={height} fill="#FFC107" />;
    case 'D':
      return <HexagonLetterD width={width} height={height} fill="#FF9800" />;
    case 'E':
      return <HexagonLetterE width={width} height={height} fill="#FF5722" />;
    case 'F':
      return <HexagonLetterF width={width} height={height} fill="#D50000" />;
    default:
      return <Text className="top-1 text-2xl font-medium">{grade}</Text>;
  }
};
