import * as React from 'react';

import { Box, IBoxCSS } from './Box';
import { Flex, IFlex } from './Flex';
import { useHover } from './hooks/useHover';
import { Icon, IIcon } from './Icon';
import { useTheme } from './theme';

// TODO allow dividers in the menu

/**
 * MENU
 */

export declare type RenderMenuItemFunc = (item: IMenuItem, index: number, items: IMenuItem[]) => React.ReactNode;
export declare type RenderMenuFunc = (
  css: IFlex['css'],
  menuItems: IMenuItem[],
  renderMenuItem: RenderMenuItemFunc
) => React.ReactNode;

const defaultRenderMenuItem: RenderMenuItemFunc = (item: IMenuItem, index: number) => {
  return <MenuItem key={index} {...item} />;
};

const defaultRenderMenu: RenderMenuFunc = (styles, menuItems, renderMenuItem) => {
  return (
    <Flex css={styles} key="menu-items">
      {menuItems.map(renderMenuItem)}
    </Flex>
  );
};

export interface IMenu extends IFlex {
  menuItems: IMenuItem[];
  renderTrigger?: (isShown: boolean) => React.ReactNode;
  renderMenuItem?: RenderMenuItemFunc;
  hideDelay?: number;
  posY?: 'top' | 'bottom';
  posX?: 'left' | 'right' | 'center';
  offset?: {
    x?: number;
    y?: number;
  };
}
export const Menu: React.FunctionComponent<IMenu> = props => {
  const {
    menuItems,
    posX = 'center',
    posY = 'bottom',
    offset,
    renderTrigger,
    renderMenuItem = defaultRenderMenuItem,
    renderMenu = defaultRenderMenu,
    hideDelay = 200,
    key,
    ...rest
  } = props;

  const [isShown, handlers] = useHover(false, props, hideDelay);

  const styles = menuStyles();
  const listStyles = menuListStyles({
    posX,
    posY,
    offset,
    hasTrigger: !!renderTrigger,
  });

  return (
    <Box key={key} css={styles} {...rest} {...handlers}>
      {renderTrigger && renderTrigger(isShown)}
      {(!renderTrigger || isShown) && renderMenu(listStyles, menuItems, renderMenuItem)}
    </Box>
  );
};

export const menuListStyles = ({ hasTrigger, posX, posY, offset }: Partial<IMenu> & { hasTrigger: boolean }) => {
  const theme = useTheme();

  return [
    {
      flexDirection: 'column',
      color: theme.menu.fg,
      backgroundColor: theme.menu.bg,
      border: `1px solid ${theme.menu.border}`,
      borderRadius: '4px',
      zIndex: 10000,
      position: hasTrigger ? 'absolute' : 'relative',
      margin: offset && `${offset.y || 0}px ${offset.x || 0}px`,
    },
    posY === 'bottom' ? { top: '100%' } : { bottom: '100%' },
    posX === 'center' && {
      left: '50%',
      transform: 'translateX(-50%)',
    },
    posX === 'left' && { right: '100%' },
    posX === 'right' && { left: '100%' },
  ];
};

export const menuStyles = (): IBoxCSS => {
  return [
    {
      display: 'inline-flex',
      position: 'relative',
      width: 'auto',
      overflow: 'visible',
      whiteSpace: 'nowrap',
    },
  ];
};
/**
 * MENU ITEM
 */

export interface IMenuItem extends Pick<IFlex, Exclude<keyof IFlex, 'title'>> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: IIcon['icon'];
  disabled?: boolean;
  onClick?: IFlex['onClick'];
}

export const MenuItem: React.FunctionComponent<IMenuItem> = props => {
  const { icon, title, subtitle, onClick, disabled, ...rest } = props;

  const styles = menuItemStyles({ disabled, onClick });

  return (
    <Flex {...rest} onClick={onClick} css={styles}>
      {icon && (
        <Flex key="menu-icon" alignItems="center" justifyContent="center" width="20px" pr={title || subtitle ? 10 : 0}>
          <Icon icon={icon} />
        </Flex>
      )}
      {(title || subtitle) && (
        <span key="menu-title">
          {title && <span>{title}</span>}
          {subtitle && <span>{subtitle}</span>}
        </span>
      )}
    </Flex>
  );
};

const menuItemStyles = ({ disabled, onClick }: Partial<IMenuItem>): IBoxCSS => {
  const { menu } = useTheme();

  return [
    {
      alignItems: 'center',
      padding: '6px 10px',
      cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
      opacity: disabled ? 0.6 : 1,

      ':hover': {
        backgroundColor: menu.hoverBg,
      },
    },
  ];
};
