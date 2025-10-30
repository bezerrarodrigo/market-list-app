import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "@/components/Button/styles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
