import { CSSProperties } from 'react';
import { theme } from 'antd';

function Styles() {
  const { useToken } = theme;
  const { token } = useToken();

  const Sider: CSSProperties = {
    overflow: 'auto',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  };

  const Main: CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const Header: CSSProperties = {
    flex: '0 0 auto',
    background: token.colorBgContainer,
  };

  const ToolBar: CSSProperties = {
    padding: `0px ${token.paddingContentHorizontalLG}px`,
    alignSelf: 'stretch',
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  };

  const TopBar: CSSProperties = {
    padding: `${token.sizeXXS}px ${token.sizeLG}px`,
    background: token.colorBgContainer,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  };

  const Content: CSSProperties = {
    overflow: 'auto',
    width: '100%',
    height: '100%',
    background: token.colorBgContainer,
    padding: `${token.paddingContentVertical}px ${token.paddingContentHorizontalLG}px`,
  };

  return {
    Sider,
    Main,
    Header,
    ToolBar,
    TopBar,
    Content,
  };
}

export default Styles;
