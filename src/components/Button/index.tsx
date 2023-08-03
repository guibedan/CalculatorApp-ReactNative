import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  click?: (label: string) => void;
  operation?: boolean;
  double?: boolean;
  triple?: boolean;
}

const Btn: React.FC<Props> = (props) => {
  const { label, click, operation, double, triple } = props;

  return (
    <TouchableOpacity
      onPress={() => click && click(label)}
      style={[
        styles.btn,
        operation && styles.operation,
        double && styles.double,
        triple && styles.triple,
      ]}
    >
      <Text style={styles.btnLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: '#f0f0f0',
    height: 80,
  },
  btnLabel: {
    fontSize: 28,
    color: '#000'
  },
  operation: {
    color: '#fff',
    backgroundColor: '#fa8231',
  },
  double: {
    flex: 2,
  },
  triple: {
    flex: 3,
  },
});

export default Btn;
