<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
*/

// Public channel for analytics updates
Broadcast::channel('analytics', function () {
    return true;
});

// Public channel for dashboard stats (admin can restrict this)
Broadcast::channel('dashboard', function ($user) {
    // Allow all authenticated users, or restrict to admin
    return $user ? true : false;
});

// Private channel for user notifications
Broadcast::channel('user.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});

// Private channel for admin dashboard
Broadcast::channel('admin-dashboard', function ($user) {
    return $user->hasRole('admin');
});

// Channel for real-time messages
Broadcast::channel('messages', function ($user) {
    return $user->hasRole(['admin', 'editor']);
});

// Channel for project updates
Broadcast::channel('projects', function () {
    return true;
});

// Channel for blog updates  
Broadcast::channel('blog', function () {
    return true;
});

// Private channel for chat
Broadcast::channel('chat.{roomId}', function ($user, $roomId) {
    // Add your authorization logic here
    return true;
});

// Presence channel for online users
Broadcast::channel('online', function ($user) {
    return [
        'id' => $user->id,
        'name' => $user->name,
        'avatar' => $user->avatar ?? null,
    ];
});
