// Create a context for the BottomSheet
import BottomSheet from '@gorhom/bottom-sheet';
import React, { createContext, useCallback, useRef, useState } from 'react';

interface BottomSheetContextType {
  activeResultId: string | undefined;
  setActiveResultId: React.Dispatch<React.SetStateAction<string | undefined>>;
  bottomSheetRef: React.RefObject<BottomSheet>;
  open: () => void;
  close: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [activeResultId, setActiveResultId] = useState<string | undefined>(undefined);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const open = () => bottomSheetRef.current?.snapToIndex(1);
  const close = () => bottomSheetRef.current?.close();

  return (
    <BottomSheetContext.Provider
      value={{
        activeResultId,
        setActiveResultId,
        bottomSheetRef,
        open,
        close,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetContext = () => {
  const context = React.useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheetContext must be used within a BottomSheetProvider');
  }
  return context;
};
