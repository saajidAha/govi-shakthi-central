import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, 
  SafeAreaView, StatusBar, Image, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatbotScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim().length === 0) return;

    const userMessage: Message = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    generateBotResponse(input);
    setInput('');
  };

  const generateBotResponse = (inputText: string) => {
    let botResponse = '';

    if (inputText.toLowerCase().includes("what's this app")) {
      botResponse = 'GoviShakthi is an AI-powered app helping farmers optimize crop sales.';
    } else if (inputText.toLowerCase().includes('features')) {
      botResponse = 'Features include crop price forecasting, alternative product suggestions, marketplace recommendation, market demand prediction, and market yield prediction.';
    } else if (inputText.toLowerCase().includes('website')) {
      botResponse = 'Visit our website at www.govishakthi.com';
    } else if (inputText.toLowerCase().includes('supported crops')) {
      botResponse = 'Currently, GoviShakthi supports mango, banana, wood apple, and strawberry.';
    } else {
      botResponse = 'I\'m not sure about that. Can you rephrase your question?';
    }

    const botMessage: Message = { id: messages.length + 2, text: botResponse, sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const quickReplies = [
    "What's this app?", 
    "What are the features in the app?", 
    "What's your website?", 
    "What are the currently supported crops?"
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#00A67E" barStyle="light-content" />

        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image source={require('../../assets/images/back.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chat with GoviShakthi</Text>
        </View>

        {/* Chat Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.messagesContainer}
          inverted
        />

        {/* Quick Replies */}
        <View style={styles.quickReplyContainer}>
          {quickReplies.map((reply, index) => (
            <TouchableOpacity key={index} style={styles.quickReplyButton} onPress={() => generateBotResponse(reply)}>
              <Text style={styles.quickReplyText}>{reply}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Input Field & Send Button */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#000000',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  quickReplyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  quickReplyButton: {
    backgroundColor: '#00A67E',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  quickReplyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#00A67E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});