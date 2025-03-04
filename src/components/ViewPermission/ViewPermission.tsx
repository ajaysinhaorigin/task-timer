import React from 'react';
interface Props {
  isVisible: boolean;
  children: React.ReactNode;
}

const ViewPermission: React.FC<Props> = ({isVisible, children}) =>
  isVisible ? children : <></>;

export default ViewPermission;
