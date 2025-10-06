

package com.instagram.message;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private RegisterRepository registerRepository;

    // Send a message
    public Message sendMessage(String senderId, String receiverId, String text) {
        Message message = new Message();
        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setText(text);
        message.setTimestamp(LocalDateTime.now());
        message.setRead(false);
        return messageRepository.save(message);
    }

    // Get conversation between 2 users
    public List<MessageDTO> getConversation(String user1, String user2) {
        List<Message> msgs = messageRepository
            .findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(
                user1, user2, user1, user2
            );

        return msgs.stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Convert Message -> DTO with usernames
    private MessageDTO toDTO(Message msg) {
        String senderName = registerRepository.findByUserId(msg.getSenderId())
                .map(Register::getFullName)
                .orElse("Unknown");
        String receiverName = registerRepository.findByUserId(msg.getReceiverId())
                .map(Register::getFullName)
                .orElse("Unknown");

        return new MessageDTO(
            msg.getId(),
            msg.getSenderId(),
            senderName,
            msg.getReceiverId(),
            receiverName,
            msg.getText(),
            msg.getTimestamp(),
            msg.isRead()
        );
    }

    // Get chat list for a user
    public List<ChatSummary> getChats(String userId) {
        List<Message> messages = messageRepository.findBySenderIdOrReceiverIdOrderByTimestampDesc(userId, userId);

        return messages.stream()
                .collect(Collectors.groupingBy(
                    msg -> msg.getSenderId().equals(userId) ? msg.getReceiverId() : msg.getSenderId()
                ))
                .entrySet().stream()
                .map(entry -> {
                    Message lastMessage = entry.getValue().get(0);
                    long unreadCount = entry.getValue().stream()
                            .filter(msg -> !msg.isRead() && msg.getReceiverId().equals(userId))
                            .count();

                    // fetch name for display
                    String partnerId = entry.getKey();
                    String partnerName = registerRepository.findByUserId(partnerId)
                            .map(Register::getFullName)
                            .orElse("Unknown");

                    return new ChatSummary(
                        partnerId,
                        partnerName,
                        lastMessage.getText(),
                        lastMessage.getTimestamp(),
                        unreadCount
                    );
                })
                .sorted((c1, c2) -> c2.getLastTimestamp().compareTo(c1.getLastTimestamp()))
                .collect(Collectors.toList());
    }

    // Mark messages as read
    public void markAsRead(String userId, String chatPartnerId) {
        List<Message> messages = messageRepository.findBySenderIdAndReceiverId(chatPartnerId, userId);
        messages.forEach(msg -> msg.setRead(true));
        messageRepository.saveAll(messages);
    }

    // DTO classes
    public static class ChatSummary {
        private String userId;
        private String fullName;
        private String lastMessage;
        private LocalDateTime lastTimestamp;
        private long unreadCount;

        public ChatSummary(String userId, String fullName, String lastMessage, LocalDateTime lastTimestamp, long unreadCount) {
            this.userId = userId;
            this.fullName = fullName;
            this.lastMessage = lastMessage;
            this.lastTimestamp = lastTimestamp;
            this.unreadCount = unreadCount;
        }

        public String getUserId() { return userId; }
        public String getFullName() { return fullName; }
        public String getLastMessage() { return lastMessage; }
        public LocalDateTime getLastTimestamp() { return lastTimestamp; }
        public long getUnreadCount() { return unreadCount; }
    }

    public static class MessageDTO {
        private String id;
        private String senderId;
        private String senderName;
        private String receiverId;
        private String receiverName;
        private String text;
        private LocalDateTime timestamp;
        private boolean read;

        public MessageDTO(String id, String senderId, String senderName,
                          String receiverId, String receiverName, String text,
                          LocalDateTime timestamp, boolean read) {
            this.id = id;
            this.senderId = senderId;
            this.senderName = senderName;
            this.receiverId = receiverId;
            this.receiverName = receiverName;
            this.text = text;
            this.timestamp = timestamp;
            this.read = read;
        }

        public String getId() { return id; }
        public String getSenderId() { return senderId; }
        public String getSenderName() { return senderName; }
        public String getReceiverId() { return receiverId; }
        public String getReceiverName() { return receiverName; }
        public String getText() { return text; }
        public LocalDateTime getTimestamp() { return timestamp; }
        public boolean isRead() { return read; }
    }
}
