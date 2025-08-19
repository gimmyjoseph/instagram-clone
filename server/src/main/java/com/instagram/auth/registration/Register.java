// package com.instagram.auth.registration;



// import java.time.LocalDate;
// import java.util.List;

// import org.bson.types.ObjectId;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// import com.fasterxml.jackson.annotation.JsonFormat;
// import com.instagram.posts.Posts;

// @Document(collection="users")
// public class Register {
//     @Id
//     private ObjectId objectId;
//     private String userId;
//      private String email;
//     private String phoneNumber;
//     private String password;
//     private String userName;
//     private String fullName;
//     private Boolean isPhoneVerified;
//     private String otp;
//     private boolean emailVerified;
//     @JsonFormat(pattern = "yyyy-MM-dd")
//     private LocalDate birthDate;
//     private List<Posts> posts;
//     private boolean isPrivate=false;

    

//     public boolean isPrivate() {
//         return isPrivate;
//     }
//     public void setPrivate(boolean isPrivate) {
//         this.isPrivate = isPrivate;
//     }
//     public LocalDate getBirthDate() {
//         return birthDate;
//     }
//     public void setBirthDate(LocalDate birthDate) {
//         this.birthDate = birthDate;
//     }
//     public String getUserId() {
//         return userId;
//     }
//     public void setUserId(String userId) {
//         this.userId = userId;
//     }

//      public boolean isEmailVerified() {
//         return emailVerified;
//     }
//     public void setEmailVerified(boolean emailVerified) {
//         this.emailVerified = emailVerified;
//     }
//      public String getOtp() {
//         return otp;
//     }
//     public void setOtp(String otp) {
//         this.otp = otp;
//     }
//      public Boolean isPhoneVerified() {
//         return isPhoneVerified;
//     }
//     public void setPhoneVerified(Boolean isPhoneVerified) {
//         this.isPhoneVerified = isPhoneVerified;
//     }
//      public ObjectId getObjectId() {
//         return objectId;
//     }
//     public void setObjectId(ObjectId objectId) {
//         this.objectId = objectId;
//     }
//     public String getEmail() {
//         return email;
//     }
//     public void setEmail(String email) {
//         this.email = email;
//     }
//     public String getPhoneNumber() {
//         return phoneNumber;
//     }
//     public void setPhoneNumber(String phoneNumber) {
//         this.phoneNumber = phoneNumber;
//     }
//     public String getPassword() {
//         return password;
//     }
//     public void setPassword(String password) {
//         this.password = password;
//     }
//     public String getUserName() {
//         return userName;
//     }
//     public void setUserName(String userName) {
//         this.userName = userName;
//     }
//     public String getFullName() {
//         return fullName;
//     }
//     public void setFullName(String fullName) {
//         this.fullName = fullName;
//     }

// }
package com.instagram.auth.registration;



import java.time.LocalDate;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.instagram.posts.Posts;

@Document(collection="users")
public class Register {
    @Id
    private ObjectId objectId;
    private String userId;
     private String email;
    private String phoneNumber;
    private String password;
    private String userName;
    private String fullName;
    private Boolean isPhoneVerified;
    private String otp;
    private boolean emailVerified;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    private List<Posts> posts;
    private boolean isPrivate=false;

    

        public boolean isPrivate() {
            return isPrivate;
        }
        public void setPrivate(boolean isPrivate) {
            this.isPrivate = isPrivate;
        }

    

    public LocalDate getBirthDate() {
        return birthDate;
    }
    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

     public boolean isEmailVerified() {
        return emailVerified;
    }
    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }
     public String getOtp() {
        return otp;
    }
    public void setOtp(String otp) {
        this.otp = otp;
    }
     public Boolean isPhoneVerified() {
        return isPhoneVerified;
    }
    public void setPhoneVerified(Boolean isPhoneVerified) {
        this.isPhoneVerified = isPhoneVerified;
    }
     public ObjectId getObjectId() {
        return objectId;
    }
    public void setObjectId(ObjectId objectId) {
        this.objectId = objectId;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

}