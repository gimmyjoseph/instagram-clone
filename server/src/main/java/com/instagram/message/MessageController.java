
package com.instagram.message;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.response.Response;

@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public ResponseEntity<Response> sendMessage(@RequestBody Message message) {
        Message sent = messageService.sendMessage(message.getSenderId(), message.getReceiverId(), message.getText());
        return ResponseEntity.ok(new Response(200, "Message sent", true, sent));
    }

    @GetMapping("/conversation/{user1}/{user2}")
    public ResponseEntity<Response> getConversation(@PathVariable String user1, @PathVariable String user2) {
        List<MessageService.MessageDTO> messages = messageService.getConversation(user1, user2);
        return ResponseEntity.ok(new Response(200, "Conversation fetched", true, messages));
    }

    @GetMapping("/chats/{userId}")
    public ResponseEntity<Response> getChats(@PathVariable String userId) {
        List<MessageService.ChatSummary> chats = messageService.getChats(userId);
        return ResponseEntity.ok(new Response(200, "Chats fetched", true, chats));
    }

    @PatchMapping("/read/{userId}/{chatPartnerId}")
    public ResponseEntity<Response> markAsRead(@PathVariable String userId, @PathVariable String chatPartnerId) {
        messageService.markAsRead(userId, chatPartnerId);
        return ResponseEntity.ok(new Response(200, "Messages marked as read", true, null));
    }
}
