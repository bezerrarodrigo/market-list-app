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
import { useEffect, useState } from "react";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

const FILTER_STATUS = [FilterStatus.PENDING, FilterStatus.DONE];
export function Home() {
  //states
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  //functions
  async function updateStatus(value: FilterStatus) {
    setFilter(value);
  }

  async function handleAdd() {
    if (!description.trim()) {
      Alert.alert("Adicionar", "Por favor, informar item para compra.");
    }

    const newItem = {
      id: new Date().getTime().toString(),
      description,
      status: FilterStatus.PENDING,
    };

    await itemsStorage.add(newItem);
    Alert.alert("Sucesso!", `Item ${description} adicionado com sucesso.`);
    await itemsByStatus();
    setDescription("");
    setFilter(FilterStatus.PENDING);
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os itens.");
    }
  }

  async function handleRemoveItem(id: string) {
    try {
      await itemsStorage.remove(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possível remover o item.");
    }
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert("Limpar", "Não foi possível remover todos os itens.");
    }
  }

  function handleClearList() {
    Alert.alert(
      "Limpar lista",
      "Tem certeza que deseja remover todos os itens?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Limpar",
          onPress: onClear,
        },
      ],
    );
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await itemsByStatus();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status do item.");
    }
  }

  useEffect(() => {
    void itemsByStatus();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input onChangeText={setDescription} value={description} />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => updateStatus(status)}
            />
          ))}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearList}
          >
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
              onRemove={() => handleRemoveItem(item.id)}
              onStatusChange={() => handleToggleItemStatus(item.id)}
            />
          )}
        />
      </View>
    </View>
  );
}
