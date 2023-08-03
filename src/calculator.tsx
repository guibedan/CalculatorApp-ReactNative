import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Btn from './components/Button';

type Operator = '+' | '-' | '*' | '/';

interface State {
    displayValue: string;
    clearDisplay: boolean;
    operation: Operator | null;
    values: [string, string]; // Corrigindo o tipo de dados para uma tupla de duas strings
    current: number;
}
  
const initialState: State = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: ['0', '0'], // Corrigindo o valor inicial para uma tupla de duas strings
    current: 0,
};

const Calculator: React.FC = () => {
  const [state, setState] = useState<State>({ ...initialState });

  const clearMemory = () => {
    setState({ ...initialState });
  };

  const isEqualsOperation = (operation: Operator | null): boolean => {
    return operation === '=';
  };

  const addDigit = (n: string) => {
    if (n === '.' && state.displayValue.includes('.')) {
      return;
    }
  
    const clearDisplay =
      state.displayValue === '0' || state.displayValue === '' || state.clearDisplay;
    const currentValue = clearDisplay ? '' : state.displayValue;
    const displayValue = currentValue + n;
  
    setState((prevState) => {
      const newValues: [string, string] = ['0', '0'];
      newValues[0] = prevState.values[0];
      newValues[1] = clearDisplay ? n : prevState.values[1];
  
      // Atualizando o estado apenas quando há uma operação em andamento
      if (prevState.operation && !prevState.clearDisplay) {
        return {
          ...prevState,
          displayValue,
          values: newValues,
        };
      } else {
        newValues[prevState.current] = displayValue;
        return {
          ...prevState,
          displayValue,
          values: newValues,
          clearDisplay: false,
        };
      }
    });
  };
  
  const setOperation = (operation: Operator) => {
    if (state.current === 0) {
      setState((prevState) => ({
        ...prevState,
        operation,
        current: 1,
        clearDisplay: true,
      }));
    } else {
      const currentOperation = state.operation;
      const equals = operation === '=';
      const values: [string, string] = ['0', '0'];
      values[0] = state.values[0];
      values[1] = state.clearDisplay ? state.values[1] : state.displayValue;
  
      try {
        values[0] = String(eval(`${values[0]} ${currentOperation} ${values[1]}`));
        if (isNaN(Number(values[0])) || !isFinite(Number(values[0]))) {
          clearMemory();
          return;
        }
      } catch (e) {
        values[0] = state.values[0];
      }
  
      values[1] = '0';
      setState({
        ...state,
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayLabel}>{state.displayValue}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.btnInput}>
          <Btn label="AC" click={clearMemory} triple />
          <Btn label="/" click={() => setOperation('/')} operation />
        </View>
        <View style={styles.btnInput}>
          <Btn label="7" click={() => addDigit('7')} />
          <Btn label="8" click={() => addDigit('8')} />
          <Btn label="9" click={() => addDigit('9')} />
          <Btn label="*" click={() => setOperation('*')} operation />
        </View>
        <View style={styles.btnInput}>
          <Btn label="4" click={() => addDigit('4')} />
          <Btn label="5" click={() => addDigit('5')} />
          <Btn label="6" click={() => addDigit('6')} />
          <Btn label="-" click={() => setOperation('-')} operation />
        </View>
        <View style={styles.btnInput}>
          <Btn label="1" click={() => addDigit('1')} />
          <Btn label="2" click={() => addDigit('2')} />
          <Btn label="3" click={() => addDigit('3')} />
          <Btn label="+" click={() => setOperation('+')} operation />
        </View>
        <View style={styles.btnInput}>
          <Btn label="0" click={() => addDigit('0')} double />
          <Btn label="." click={() => addDigit('.')} />
          <Btn label="=" click={() => setOperation('=')} operation />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f0f0f0',
    height: '100%',
  },
  display: {
    fontSize: 48,
    marginBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  displayLabel: {
    fontSize: 48,
    margin: 10
  },
  buttonsContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignContent: 'center'
  },
  btnInput: {
    width: '100%',
    flexDirection: 'row',
  },
});

export default Calculator;

