<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'John Doe',
                'role' => 'CEO & Founder',
                'bio' => 'With over 15 years of experience in cybersecurity, John leads our team with vision and expertise.',
                'expertise' => ['Cybersecurity', 'Leadership', 'Strategy'],
                'social' => [
                    'linkedin' => 'https://linkedin.com/in/johndoe',
                    'twitter' => 'https://twitter.com/johndoe',
                ],
                'order' => 1,
                'status' => 'active',
            ],
            [
                'name' => 'Jane Smith',
                'role' => 'Chief Technology Officer',
                'bio' => 'Jane brings deep technical expertise and innovative solutions to complex security challenges.',
                'expertise' => ['Cloud Security', 'DevSecOps', 'Architecture'],
                'social' => [
                    'linkedin' => 'https://linkedin.com/in/janesmith',
                    'github' => 'https://github.com/janesmith',
                ],
                'order' => 2,
                'status' => 'active',
            ],
            [
                'name' => 'Mike Johnson',
                'role' => 'Lead Security Consultant',
                'bio' => 'Mike specializes in penetration testing and security audits for enterprise clients.',
                'expertise' => ['Penetration Testing', 'Network Security', 'Compliance'],
                'social' => [
                    'linkedin' => 'https://linkedin.com/in/mikejohnson',
                ],
                'order' => 3,
                'status' => 'active',
            ],
        ];

        foreach ($members as $member) {
            TeamMember::firstOrCreate(
                ['slug' => \Str::slug($member['name'])],
                $member
            );
        }
    }
}
