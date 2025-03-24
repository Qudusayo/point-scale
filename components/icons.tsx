import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Home = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="m19 8.71-5.333-4.148a2.666 2.666 0 0 0-3.274 0L5.059 8.71a2.67 2.67 0 0 0-1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.2c0-.823-.38-1.6-1.03-2.105" />
    <Path d="M16 15c-2.21 1.333-5.792 1.333-8 0" />
  </Svg>
);

const Settings = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M19.875 6.27A2.23 2.23 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1-2.184 0l-6.75-4.27A2.23 2.23 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98z" />
    <Path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0" />
  </Svg>
);

const HexagonLetterA = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="m13.666 1.429 6.75 3.98.096.063.093.078.106.074a3.22 3.22 0 0 1 1.284 2.39l.005.204v7.284c0 1.175-.643 2.256-1.623 2.793l-6.804 4.302c-.98.538-2.166.538-3.2-.032l-6.695-4.237A3.23 3.23 0 0 1 2 15.502V8.217c0-1.106.57-2.128 1.476-2.705l6.95-4.098c1-.552 2.214-.552 3.24.015M12 7a3 3 0 0 0-3 3v6a1 1 0 0 0 2 0v-2h2v2a1 1 0 0 0 .883.993L14 17a1 1 0 0 0 1-1v-6a3 3 0 0 0-3-3m0 2a1 1 0 0 1 1 1v2h-2v-2a1 1 0 0 1 .883-.993z" />
  </Svg>
);

const HexagonLetterAPlus = (props: React.ComponentProps<typeof Svg>) => (
  <Svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M13.666 1.429l6.75 3.98l.096 .063l.093 .078l.106 .074a3.22 3.22 0 0 1 1.284 2.39l.005 .204v7.284c0 1.175 -.643 2.256 -1.623 2.793l-6.804 4.302c-.98 .538 -2.166 .538 -3.2 -.032l-6.695 -4.237a3.23 3.23 0 0 1 -1.678 -2.826v-7.285c0 -1.106 .57 -2.128 1.476 -2.705l6.95 -4.098c1 -.552 2.214 -.552 3.24 .015m-1.666 5.571a3 3 0 0 0 -3 3v6a1 1 0 0 0 2 0v-2h2v2a1 1 0 0 0 .883 .993l.117 .007a1 1 0 0 0 1 -1v-6a3 3 0 0 0 -3 -3m0 2a1 1 0 0 1 1 1v2h-2v-2a1 1 0 0 1 .883 -.993z" />
    <Path
      d="M14.5 7.2 L19.5 7.2"
      fill="none"
      stroke="white"
      strokeWidth={1.2}
      strokeLinecap="round"
    />
    <Path d="M17 5 L17 9.5" fill="none" stroke="white" strokeWidth={1.2} strokeLinecap="round" />
  </Svg>
);

const HexagonLetterB = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="m13.666 1.429 6.75 3.98.096.063.093.078.106.074a3.22 3.22 0 0 1 1.284 2.39l.005.204v7.284c0 1.175-.643 2.256-1.623 2.793l-6.804 4.302c-.98.538-2.166.538-3.2-.032l-6.695-4.237A3.23 3.23 0 0 1 2 15.502V8.217c0-1.106.57-2.128 1.476-2.705l6.95-4.098c1-.552 2.214-.552 3.24.015M12 7h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a3 3 0 0 0 3-3l-.005-.176a3 3 0 0 0-.654-1.7L14.235 12l.106-.124A3 3 0 0 0 12 7m0 6a1 1 0 0 1 0 2h-1v-2zm0-4a1 1 0 0 1 0 2h-1V9z" />
  </Svg>
);

const HexagonLetterC = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="m13.666 1.429 6.75 3.98.096.063.093.078.106.074a3.22 3.22 0 0 1 1.284 2.39l.005.204v7.284c0 1.175-.643 2.256-1.623 2.793l-6.804 4.302c-.98.538-2.166.538-3.2-.032l-6.695-4.237A3.23 3.23 0 0 1 2 15.502V8.217c0-1.106.57-2.128 1.476-2.705l6.95-4.098c1-.552 2.214-.552 3.24.015M12 7a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0 1 1 0 0 0-1.993-.117L13 14a1 1 0 0 1-2 0v-4a1 1 0 0 1 1.993-.117L13 10a1 1 0 0 0 2 0 3 3 0 0 0-3-3" />
  </Svg>
);

const HexagonLetterD = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="m13.666 1.429 6.75 3.98.096.063.093.078.106.074a3.22 3.22 0 0 1 1.284 2.39l.005.204v7.284c0 1.175-.643 2.256-1.623 2.793l-6.804 4.302c-.98.538-2.166.538-3.2-.032l-6.695-4.237A3.23 3.23 0 0 1 2 15.502V8.217c0-1.106.57-2.128 1.476-2.705l6.95-4.098c1-.552 2.214-.552 3.24.015M12 7h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3m0 2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1V9z" />
  </Svg>
);

const HexagonLetterE = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M13.666 1.429l6.75 3.98l.096 .063l.093 .078l.106 .074a3.22 3.22 0 0 1 1.284 2.39l.005 .204v7.284c0 1.175 -.643 2.256 -1.623 2.793l-6.804 4.302c-.98 .538 -2.166 .538 -3.2 -.032l-6.695 -4.237a3.23 3.23 0 0 1 -1.678 -2.826v-7.285c0 -1.106 .57 -2.128 1.476 -2.705l6.95 -4.098c1 -.552 2.214 -.552 3.24 .015m.334 5.571h-4a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1 -1l-.007 -.117a1 1 0 0 0 -.993 -.883h-3v-2h1.5a1 1 0 0 0 .993 -.883l.007 -.117a1 1 0 0 0 -1 -1h-1.5v-2h3a1 1 0 0 0 0 -2" />
  </Svg>
);

const HexagonLetterF = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="m13.666 1.429 6.75 3.98.096.063.093.078.106.074a3.22 3.22 0 0 1 1.284 2.39l.005.204v7.284c0 1.175-.643 2.256-1.623 2.793l-6.804 4.302c-.98.538-2.166.538-3.2-.032l-6.695-4.237A3.23 3.23 0 0 1 2 15.502V8.217c0-1.106.57-2.128 1.476-2.705l6.95-4.098c1-.552 2.214-.552 3.24.015M14 7h-4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1l.117-.007A1 1 0 0 0 11 16v-3h2a1 1 0 0 0 .993-.883L14 12a1 1 0 0 0-1-1h-2V9h3a1 1 0 0 0 0-2" />
  </Svg>
);

const Pencil = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16zm9.5-13.5 4 4" />
  </Svg>
);

export {
  HexagonLetterA,
  HexagonLetterAPlus,
  HexagonLetterB,
  HexagonLetterC,
  HexagonLetterD,
  HexagonLetterE,
  HexagonLetterF,
  Home,
  Pencil,
  Settings,
};
