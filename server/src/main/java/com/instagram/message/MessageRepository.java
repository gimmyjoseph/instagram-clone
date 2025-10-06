package com.instagram.message;



import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

    // Fetch conversation between 2 users
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(
        String sender1, String receiver1, String sender2, String receiver2
    );

    // Fetch all messages for a user (for chat list)
    List<Message> findBySenderIdOrReceiverIdOrderByTimestampDesc(String senderId, String receiverId);

    // Fetch unread messages from a chat partner
    List<Message> findBySenderIdAndReceiverId(String senderId, String receiverId);
}


