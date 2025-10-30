import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useState } from "react";

const FILTER_STATUS = [FilterStatus.PENDING, FilterStatus.DONE];

type Description = {
  id: string;
  description: string;
  status: FilterStatus;
};

export function Home() {
  //states
  const [filter, setFilter] = useState<FilterStatus>();
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<Description[]>([]);

  //functions
  function updateStatus(value: FilterStatus) {
    setFilter(value);
  }

  function handleAdd() {
    if (!description.trim()) {
      Alert.alert("Adicionar", "Por favor, informar item para compra.");
    }

    const newItem = {
      id: new Date().getTime().toString(),
      description,
      status: FilterStatus.PENDING,
    };

    setItems((prevState) => [newItem, ...prevState]);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input onChangeText={setDescription} />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              isActive={status === filter}
              status={status}
              onPress={() => updateStatus(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyList}>Nenhum item encontrado.</Text>
          )}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => console.log("Remover")}
              onStatusChange={() => console.log("Status change")}
            />
          )}
        />
      </View>
    </View>
  );
}
