package com.instagram.auth.login.token;


public class UserTokenEntry {

    private UserAccessToken accessToken;
    private UserRefreshToken refreshToken;

    public UserTokenEntry(UserAccessToken accessToken, UserRefreshToken refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public UserAccessToken getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(UserAccessToken accessToken) {
        this.accessToken = accessToken;
    }

    public UserRefreshToken getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(UserRefreshToken refreshToken) {
        this.refreshToken = refreshToken;
    }
}