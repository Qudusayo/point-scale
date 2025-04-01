import { Feather } from '@expo/vector-icons';
import { useRef } from 'react';
import { Alert, FlatList, Pressable, View } from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Pencil } from './icons';
import Text from './text';

type Data = {
  id: number;
  letter: string;
  minScore: number;
  maxScore: number;
  scale: number;
};

// const datas: Data[] = [
//   { id: 1, letter: 'A+', minScore: 90, maxScore: 100, scale: 4.0 },
//   { id: 2, letter: 'A', minScore: 85, maxScore: 89, scale: 4.0 },
//   { id: 3, letter: 'A-', minScore: 80, maxScore: 84, scale: 3.7 },
//   { id: 4, letter: 'B+', minScore: 75, maxScore: 79, scale: 3.3 },
//   { id: 5, letter: 'B', minScore: 70, maxScore: 74, scale: 3.0 },
//   { id: 6, letter: 'B-', minScore: 65, maxScore: 69, scale: 2.7 },
//   { id: 7, letter: 'C+', minScore: 60, maxScore: 64, scale: 2.3 },
//   { id: 8, letter: 'C', minScore: 55, maxScore: 59, scale: 2.0 },
//   { id: 9, letter: 'C-', minScore: 50, maxScore: 54, scale: 1.7 },
//   { id: 10, letter: 'D+', minScore: 45, maxScore: 49, scale: 1.3 },
//   { id: 11, letter: 'D', minScore: 40, maxScore: 44, scale: 1.0 },
//   { id: 12, letter: 'F', minScore: 0, maxScore: 39, scale: 0.0 },
// ];

const datas: Data[] = [
  { id: 1, letter: 'A', minScore: 70, maxScore: 100, scale: 4.0 },
  { id: 2, letter: 'B', minScore: 60, maxScore: 69, scale: 3.0 },
  { id: 3, letter: 'C', minScore: 50, maxScore: 59, scale: 2.0 },
  { id: 4, letter: 'D', minScore: 45, maxScore: 49, scale: 1.0 },
  { id: 5, letter: 'F', minScore: 0, maxScore: 44, scale: 0.0 },
];

function RightAction({
  handleEdit,
  handleDelete,
}: {
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  return (
    <View className="w-2/5 flex-row">
      <Pressable
        className="block h-full flex-1 items-center justify-center bg-[#5271FF]"
        onPress={handleEdit}
      >
        <Pencil color="#fff" />
      </Pressable>
      <Pressable
        className="block h-full flex-1 items-center justify-center rounded-lg rounded-l-none bg-[#DC3545]"
        onPress={handleDelete}
      >
        <Feather name="trash-2" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

export default function TableFlatList() {
  const openSwipeableRef = useRef<SwipeableMethods | null>(null);

  const RenderItem = ({ data }: { data: Data }) => {
    const swipeableRef = useRef<SwipeableMethods | null>(null);

    const handleDelete = () => {
      Alert.alert(`Are you sure you want to delete the grade?`, 'It will be gone for good', [
        {
          text: 'Yes',
          onPress: () => {
            // Handle delete action here
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => swipeableRef.current?.close(),
        },
      ]);
    };

    return (
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={() => (
          <RightAction handleDelete={handleDelete} handleEdit={handleDelete} />
        )}
        overshootFriction={0}
        dragOffsetFromRightEdge={40}
        overshootLeft={false}
        overshootRight={false}
        onSwipeableWillOpen={() => {
          // Close previously opened swipeable if it exists and is different from current
          if (openSwipeableRef.current && openSwipeableRef.current !== swipeableRef.current) {
            openSwipeableRef.current.close();
          }
          // Update the ref to the currently open swipeable
          openSwipeableRef.current = swipeableRef.current;
        }}
      >
        <View className="flex-row items-center justify-between bg-[#f3f4f6] py-4">
          <Text className="flex-1 text-center text-lg">{data.letter}</Text>
          <Text className="flex-1 text-center text-lg">
            {data.minScore} - {data.maxScore}
          </Text>
          <Text className="flex-1 text-center text-lg">{data.scale}</Text>
        </View>
      </ReanimatedSwipeable>
    );
  };

  return (
    <View className="flex-1">
      <View className="flex-row justify-between border-b border-gray-200 py-4">
        <Text className="flex-1 text-center text-lg">Letter</Text>
        <Text className="flex-1 text-center text-lg">% Grading</Text>
        <Text className="flex-1 text-center text-lg">Scale</Text>
      </View>
      <FlatList<Data>
        data={datas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderItem data={item} />}
        ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
      />
    </View>
  );
}
