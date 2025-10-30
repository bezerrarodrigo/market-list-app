import { TextInput, TextInputProps } from "react-native";
import { styles } from "@/components/Input/styles";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      placeholder="O que você precisa comprar?"
      placeholderTextColor="#74798b"
      style={styles.container}
      {...props}
    />
  );
}
