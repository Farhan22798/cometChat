
import { CometChat } from "@cometchat/chat-sdk-react-native";
import Messages from "../Messages";

const ChattingScreen = ({ route, navigation }: any) => {
  const { user } = route.params;

  return (
    <Messages
      user={user}
      onBack={() => navigation.goBack()}
    />
  );
};

export default ChattingScreen;