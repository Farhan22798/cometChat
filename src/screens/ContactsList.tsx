
import { CometChatUsers } from "@cometchat/chat-uikit-react-native";

const ContactsList = ({ navigation }: any) => {
  return (
    <CometChatUsers
      onItemPress={(user) => {
        navigation.navigate("ChattingScreen", { user });
      }}
    />
  );
};

export default ContactsList;