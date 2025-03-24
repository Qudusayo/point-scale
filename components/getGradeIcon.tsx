import {
  HexagonLetterA,
  HexagonLetterB,
  HexagonLetterC,
  HexagonLetterD,
  HexagonLetterE,
  HexagonLetterF,
} from './icons';
import Text from './text';

export const GetGradeIcon = ({ grade }: { grade: string }) => {
  switch (grade) {
    case 'A':
      return <HexagonLetterA width={32} height={32} fill="#00C853" />;
    case 'B':
      return <HexagonLetterB width={32} height={32} fill="#2196F3" />;
    case 'C':
      return <HexagonLetterC width={32} height={32} fill="#FFC107" />;
    case 'D':
      return <HexagonLetterD width={32} height={32} fill="#FF9800" />;
    case 'E':
      return <HexagonLetterE width={32} height={32} fill="#FF5722" />;
    case 'F':
      return <HexagonLetterF width={32} height={32} fill="#D50000" />;
    default:
      return <Text className="top-1 text-2xl font-medium">{grade}</Text>;
  }
};
