<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'avatar',
        'phone',
        'company',
        'position',
        'bio',
        'website',
        'location',
        'github_url',
        'linkedin_url',
        'twitter_url',
        'instagram_url',
        'facebook_url',
        'email_notifications',
        'push_notifications',
        'sms_notifications',
        'notification_new_message',
        'notification_new_project',
        'notification_new_comment',
        'notification_system_updates',
        'profile_public',
        'show_email',
        'show_phone',
        'show_activity',
        'theme',
        'language',
        'timezone',
        'date_format',
        'time_format',
        'two_factor_enabled',
        'two_factor_secret',
        'last_password_change',
        'login_notifications',
        'trusted_devices',
        'custom_settings',
    ];

    protected $casts = [
        'email_notifications' => 'boolean',
        'push_notifications' => 'boolean',
        'sms_notifications' => 'boolean',
        'notification_new_message' => 'boolean',
        'notification_new_project' => 'boolean',
        'notification_new_comment' => 'boolean',
        'notification_system_updates' => 'boolean',
        'profile_public' => 'boolean',
        'show_email' => 'boolean',
        'show_phone' => 'boolean',
        'show_activity' => 'boolean',
        'two_factor_enabled' => 'boolean',
        'login_notifications' => 'boolean',
        'trusted_devices' => 'array',
        'custom_settings' => 'array',
        'last_password_change' => 'datetime',
    ];

    protected $hidden = [
        'two_factor_secret',
    ];

    /**
     * Get the user that owns the settings
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get social media links as array
     */
    public function getSocialMediaAttribute(): array
    {
        return [
            'github' => $this->github_url,
            'linkedin' => $this->linkedin_url,
            'twitter' => $this->twitter_url,
            'instagram' => $this->instagram_url,
            'facebook' => $this->facebook_url,
        ];
    }

    /**
     * Get notification preferences as array
     */
    public function getNotificationPreferencesAttribute(): array
    {
        return [
            'email' => $this->email_notifications,
            'push' => $this->push_notifications,
            'sms' => $this->sms_notifications,
            'new_message' => $this->notification_new_message,
            'new_project' => $this->notification_new_project,
            'new_comment' => $this->notification_new_comment,
            'system_updates' => $this->notification_system_updates,
        ];
    }

    /**
     * Get privacy settings as array
     */
    public function getPrivacySettingsAttribute(): array
    {
        return [
            'profile_public' => $this->profile_public,
            'show_email' => $this->show_email,
            'show_phone' => $this->show_phone,
            'show_activity' => $this->show_activity,
        ];
    }

    /**
     * Get display preferences as array
     */
    public function getDisplayPreferencesAttribute(): array
    {
        return [
            'theme' => $this->theme,
            'language' => $this->language,
            'timezone' => $this->timezone,
            'date_format' => $this->date_format,
            'time_format' => $this->time_format,
        ];
    }
}
