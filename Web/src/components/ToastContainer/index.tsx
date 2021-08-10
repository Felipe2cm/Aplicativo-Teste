import React from 'react';
import { config, useTransition } from 'react-spring';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    {
      from: { right: '-120%', opacity: 0, transform: 'rotateX(0deg)' },
      enter: { right: '-0%', opacity: 1, transform: 'rotateX(360deg)' },
      leave: { right: '-120%', opacity: 0, transform: 'rotateX(0deg)' },
      keys: (item) => item.id,

    }
    );

  return (
    <Container>
      {messagesWithTransitions((styles, item) => (
        <Toast
        key={item.id}
        message={item}
        style={styles}
        />
      ))}
    </Container>
  )
}

export default ToastContainer;
