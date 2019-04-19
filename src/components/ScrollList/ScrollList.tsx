// /* @jsx jsx */
// import { css as cssx, jsx } from '@emotion/core';
// import { forwardRef } from 'react';
// import * as ReactWindow from 'react-window';

// import { AutoSizer } from './AutoSizer';
// import { IBoxCSS } from './Box';
// import { ITheme, useTheme } from './theme';

// export {
//   areEqual,
//   shouldComponentUpdate,
//   ListItemKeySelector,
//   FixedSizeList as IFixedSizeList,
//   VariableSizeList as IVariableSizeList,
// } from 'react-window';

// export interface IFixedSizeListProps extends ReactWindow.FixedSizeListProps {
//   css?: IBoxCSS;
// }

// export interface IVariableSizeListProps extends ReactWindow.VariableSizeListProps {
//   css?: IBoxCSS;
// }

// const FixedSizeList: React.FunctionComponent<IFixedSizeListProps> = forwardRef<
//   ReactWindow.FixedSizeList,
//   IFixedSizeListProps
// >(function FixedSizeList(props, ref) {
//   const { scrollbar: theme } = useTheme();
//   const { width, height, css, ...rest } = props;

//   return (
//     <AutoSizer width={width} height={height}>
//       {({ width: listWidth, height: listHeight }) => (
//         <ReactWindow.FixedSizeList
//           {...rest}
//           ref={ref}
//           css={scrollListStyles(theme, css)}
//           height={listHeight}
//           width={listWidth}
//         />
//       )}
//     </AutoSizer>
//   );
// });

// FixedSizeList.displayName = 'FixedSizeList';

// const VariableSizeList: React.FunctionComponent<IVariableSizeListProps> = forwardRef<
//   ReactWindow.VariableSizeList,
//   IVariableSizeListProps
// >(function VariableSizeList(props, ref) {
//   const { width, height, css, ...rest } = props;
//   const { scrollbar: theme } = useTheme();

//   return (
//     <AutoSizer width={width} height={height}>
//       {({ width: listWidth, height: listHeight }) => (
//         <ReactWindow.VariableSizeList
//           {...rest}
//           ref={ref}
//           css={scrollListStyles(theme, css)}
//           height={listHeight}
//           width={listWidth}
//         />
//       )}
//     </AutoSizer>
//   );
// });

// VariableSizeList.displayName = 'VariableSizeList';

// export const scrollListStyles = (theme: ITheme['scrollbar'], css?: IBoxCSS) => {
//   return [
//     cssx`
//       &::-webkit-scrollbar {
//         height: 6px;
//         background-color: transparent;
//         width: 6px;
//       }

//       &::-webkit-scrollbar-thumb {
//         background-color: ${theme.bg};
//         border-radius: 10px;
//       }

//       scrollbar-color: ${theme.bg} transparent;
//       scrollbar-width: thin;
//     `,
//     css,
//   ];
// };

// export { FixedSizeList, VariableSizeList };