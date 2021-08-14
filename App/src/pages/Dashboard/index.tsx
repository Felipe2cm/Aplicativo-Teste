import React from 'react';
import { View } from 'react-native';

import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Button onPress={signOut} >
        Deslogar
      </Button>
    </View>
  )
}

export default Dashboard;
