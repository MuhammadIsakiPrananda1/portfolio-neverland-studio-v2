<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General Settings
            [
                'key' => 'site_name',
                'value' => 'Neverland Studio',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Website name',
            ],
            [
                'key' => 'site_description',
                'value' => 'Professional Cybersecurity and IT Solutions',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Website description',
            ],
            [
                'key' => 'contact_email',
                'value' => 'contact@neverlandstudio.com',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Contact email address',
            ],
            [
                'key' => 'contact_phone',
                'value' => '+1 (555) 123-4567',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Contact phone number',
            ],
            // Social Media
            [
                'key' => 'social_linkedin',
                'value' => 'https://linkedin.com/company/neverland-studio',
                'type' => 'string',
                'group' => 'social',
                'description' => 'LinkedIn URL',
            ],
            [
                'key' => 'social_twitter',
                'value' => 'https://twitter.com/neverlandstudio',
                'type' => 'string',
                'group' => 'social',
                'description' => 'Twitter URL',
            ],
            [
                'key' => 'social_github',
                'value' => 'https://github.com/neverland-studio',
                'type' => 'string',
                'group' => 'social',
                'description' => 'GitHub URL',
            ],
            // Features
            [
                'key' => 'enable_blog',
                'value' => '1',
                'type' => 'boolean',
                'group' => 'features',
                'description' => 'Enable blog feature',
            ],
            [
                'key' => 'enable_contact_form',
                'value' => '1',
                'type' => 'boolean',
                'group' => 'features',
                'description' => 'Enable contact form',
            ],
            [
                'key' => 'enable_analytics',
                'value' => '1',
                'type' => 'boolean',
                'group' => 'features',
                'description' => 'Enable analytics tracking',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
