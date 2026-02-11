import React, { useState } from 'react';
import { Users, Heart, Sparkles, ArrowRight, ChevronRight, Verified } from 'lucide-react';

interface Profile {
  name: string;
  role: string;
  description: string;
  image: string;
  followers: number;
  following: number;
  verified: boolean;
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgGradient: string;
  profiles: Profile[];
}

export default function ModernProfileSections() {
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);

  const sections: Section[] = [
    {
      id: 'kids',
      title: 'Kids Care Specialists',
      subtitle: 'Expert guidance for your children\'s development and wellbeing',
      icon: Sparkles,
      accentColor: '#00d4ff',
      bgGradient: 'from-violet-500/10 to-purple-500/10',
      profiles: [
        {
          name: 'Emma Rodriguez',
          role: 'Child Psychology Specialist',
          description: 'Helping children develop emotional intelligence & confidence.',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
          followers: 524,
          following: 89,
          verified: true
        },
        {
          name: 'Lucas Chen',
          role: 'Educational Content Creator',
          description: 'Making learning fun and engaging for young minds.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          followers: 392,
          following: 156,
          verified: true
        },
        {
          name: 'Sofia Martinez',
          role: 'Kids Wellness Coach',
          description: 'Teaching mindfulness & healthy habits to children.',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
          followers: 678,
          following: 134,
          verified: true
        }
      ]
    },
    {
      id: 'pets',
      title: 'Pet Wellness Experts',
      subtitle: 'Comprehensive care for your beloved companions',
      icon: Heart,
      accentColor: '#00a896',
      bgGradient: 'from-rose-500/10 to-pink-500/10',
      profiles: [
        {
          name: 'Dr. James Wilson',
          role: 'Veterinary Behaviorist',
          description: 'Expert in pet psychology & animal wellness care.',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
          followers: 1240,
          following: 67,
          verified: true
        },
        {
          name: 'Maya Patel',
          role: 'Pet Training Specialist',
          description: 'Building stronger bonds between pets and owners.',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
          followers: 856,
          following: 203,
          verified: true
        },
        {
          name: 'Alex Thompson',
          role: 'Animal Wellness Advocate',
          description: 'Promoting holistic health for our furry friends.',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
          followers: 945,
          following: 178,
          verified: true
        }
      ]
    },
    {
      id: 'seniors',
      title: 'Senior Care Professionals',
      subtitle: 'Dedicated support for meaningful golden years',
      icon: Users,
      accentColor: '#1e3a8a',
      bgGradient: 'from-cyan-500/10 to-blue-500/10',
      profiles: [
        {
          name: 'Margaret Foster',
          role: 'Senior Life Coach',
          description: 'Empowering seniors to live vibrant & fulfilling lives.',
          image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
          followers: 1532,
          following: 94,
          verified: true
        },
        {
          name: 'Robert Kim',
          role: 'Geriatric Care Specialist',
          description: 'Dedicated to improving quality of life for older adults.',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
          followers: 1089,
          following: 142,
          verified: true
        },
        {
          name: 'Eleanor Davis',
          role: 'Wellness & Activity Coordinator',
          description: 'Creating joyful experiences for the golden years.',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
          followers: 1876,
          following: 211,
          verified: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e6fba] via-[#3a7ac4] to-[#2e6fba]">
      <style>{`
        :root {
          --background: #2e6fba;
          --foreground: #71aedd;
        }
        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .float-in {
          animation: float-in 0.8s ease-out forwards;
        }

        .glass-card {
          background: rgba(113, 174, 221, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(113, 174, 221, 0.15);
        }

        .profile-image {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .profile-card:hover .profile-image {
          transform: scale(1.05);
        }

        .scroll-indicator {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative px-6 pt-20 pb-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(113,174,221,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(113,174,221,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 float-in">
            <div className="w-2 h-2 rounded-full bg-[#71aedd] animate-pulse"></div>
            <span className="text-sm font-medium text-white">10,000+ Verified Professionals</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tight float-in" style={{ animationDelay: '0.1s' }}>
            Discover Expert
            <br />
            <span className="bg-gradient-to-r from-[#71aedd] via-white to-[#9dd4f5] bg-clip-text text-transparent">
              Care & Guidance
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 float-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Connect with trusted specialists dedicated to the wellbeing of your kids, pets, and seniors
          </p>

          <button className="px-8 py-4 rounded-full bg-white text-[#2e6fba] font-bold text-lg hover:scale-105 transition-all shadow-2xl float-in hover:shadow-white/20" style={{ animationDelay: '0.3s' }}>
            Explore All Experts
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronRight className="w-6 h-6 text-white/40 rotate-90" />
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 space-y-32 pb-32">
        {sections.map((section, sectionIdx) => {
          const IconComponent = section.icon;

          return (
            <section id="services"  key={section.id} className="float-in" style={{ animationDelay: `${sectionIdx * 0.2}s` }}>
              {/* Section Header */}
<div className="mb-12">
                <div 
                  className="relative overflow-hidden rounded-4xl p-10 md:p-16 shadow-xl"
                  style={{backgroundColor: section.accentColor}}
                >
                  <div className="relative flex items-center gap-8">
                    {/* Simple icon circle */}
                    <div 
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center flex-shrink-0 bg-white/20 backdrop-blur-sm"
                    >
                      <div style={{color: 'white'}}>
                        <IconComponent className="w-12 h-12 md:w-14 md:h-14" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-3 leading-tight">
                        {section.title}
                      </h2>
                      <p className="text-white/90 text-lg md:text-xl">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.profiles.map((profile, idx) => (
                  <div
                    key={idx}
                    className="profile-card group rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
                    onMouseEnter={() => setHoveredProfile(`${section.id}-${idx}`)}
                    onMouseLeave={() => setHoveredProfile(null)}
                  >
                    {/* Image with Overlay Content */}
                    <div className="relative h-[550px] overflow-hidden">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="profile-image w-full h-full object-cover"
                      />

                      {/* Blur Overlay with Content */}
                      <div className="absolute bottom-0 left-0 right-0 h-[240px] backdrop-blur-xl bg-white/70 p-6 flex flex-col justify-end">
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {profile.name}
                            </h3>
                            {profile.verified && (
                              <Verified className="w-5 h-5 text-green-600 fill-green-600 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {profile.description}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">{profile.followers}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">{profile.following}</span>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button
                          className="w-full py-2.5 rounded-xl font-semibold text-gray-900 bg-white border border-gray-200 transition-all hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center gap-2"
                        >
                          Follow
                          <span className="text-lg leading-none">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Link */}
              <div className="mt-8 text-center">
                <button
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white font-semibold transition-colors group"
                >
                  View all {section.title.toLowerCase()}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </section>
          );
        })}
      </div>


    </div>
  );
}