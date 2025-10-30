import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#d0d2d8",
    paddingTop: 78,
  },
  logo: {
    height: 34,
    width: 134,
  },
  form: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 7,
    marginTop: 42,
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderColor: "#e4e6ec",
    paddingBottom: 12,
  },
  clearButton: {
    marginLeft: "auto",
  },
  clearText: {
    fontSize: 12,
    fontWeight: 600,
    color: "#828282",
  },
  separator: {
    height: 1,
    backgroundColor: "#e4e6ec",
    marginVertical: 16,
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 62,
  },
  emptyList: {
    fontSize: 14,
    fontWeight: 600,
    color: "#808080",
    textAlign: "center",
  },
});
