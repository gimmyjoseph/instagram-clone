package com.instagram.response;

public class Response {

    private int statuscode;
    private String message;
    private boolean success;
    private Object data;

    public Response() {
    }

    // Constructor for all fields
    public Response(int statuscode, String message, boolean success, Object data) {
        this.statuscode = statuscode;
        this.message = message;
        this.success = success;
        this.data = data;
    }

    // Convenience constructor for success responses without data
    public Response(int statuscode, String message, boolean success) {
        this(statuscode, message, success, null);
    }

    // Getters and Setters
    public int getStatuscode() {
        return statuscode;
    }

    public void setStatuscode(int statuscode) {
        this.statuscode = statuscode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    // Optionally, you can override toString(), equals(), and hashCode() methods {
    
}
