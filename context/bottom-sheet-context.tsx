// Create a context for the BottomSheet
import BottomSheet from '@gorhom/bottom-sheet';
import React, { createContext, useCallback, useRef } from 'react';

interface BottomSheetContextType {
  bottomSheetRef: React.RefObject<BottomSheet>;
  handleSheetChanges: (index: number) => void;
  open: () => void;
  close: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const open = () => bottomSheetRef.current?.snapToIndex(1);
  const close = () => bottomSheetRef.current?.close();

  return (
    <BottomSheetContext.Provider value={{ bottomSheetRef, handleSheetChanges, open, close }}>
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
