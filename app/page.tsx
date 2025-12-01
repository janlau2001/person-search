'use client';

import { FloatingChatbot } from '@/components/floating-chatbot';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import digitalTwinData from '../digitaltwin.json';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const }
};

export default function Home() {
  const { personal, education, experience, skills, projects } = digitalTwinData;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-20 max-w-5xl">
        
        {/* Hero Section - Clean & Professional */}
        <motion.section 
          className="mb-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 order-2 md:order-1"
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">Hi, I am</p>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Jan Laurence
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-6">
                {personal.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500 mb-8">
                <MapPin className="h-4 w-4" />
                <span>{personal.location}</span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
                {personal.summary}
              </p>

              {/* Contact Links - Minimal Style */}
              <div className="flex items-center gap-3">
                <Link href={personal.contact.github} target="_blank">
                  <Button variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
                <Link href={personal.contact.linkedin} target="_blank">
                  <Button variant="outline" className="gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </Link>
                <Link href={`mailto:${personal.contact.email.split('/')[0]}`}>
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Profile Picture - Right Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex-shrink-0 order-1 md:order-2 mx-auto md:mx-0"
            >
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
                <Image
                  src="/profile.JPG"
                  alt="Jan Laurence"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section - Simplified */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Background</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {personal.elevator_pitch}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {personal.personality_traits?.hobbies?.map((hobby, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0">
                    {hobby}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <hr className="border-t border-gray-200 dark:border-gray-800 mb-24" />

        {/* Experience */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Experience</h2>
          <div className="space-y-6">
            {Array.isArray(experience) && experience.map((exp, idx: number) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</span>
                </div>
                <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-3">{exp.company}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{exp.description}</p>
                {'technical_skills_used' in exp && exp.technical_skills_used && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technical_skills_used.map((skill: string, tidx: number) => (
                      <Badge key={tidx} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-800 border-0">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        <hr className="border-t border-gray-200 dark:border-gray-800 mb-24" />

        {/* Education */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Education</h2>
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{education.degree}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{education.graduation_year}</span>
              </div>
              <h4 className="text-lg text-gray-700 dark:text-gray-300">{education.university}</h4>
            </div>
          </div>
        </motion.section>

        <hr className="border-t border-gray-200 dark:border-gray-800 mb-24" />

        {/* Skills */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Skills</h2>
          <div className="space-y-6">
            {Object.entries(skills).map(([category, skillList]) => {
              if (Array.isArray(skillList)) {
                return (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 capitalize">
                      {category.replace('_', ' ')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </motion.section>

        <hr className="border-t border-gray-200 dark:border-gray-800 mb-24" />

        {/* Projects */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, tidx) => (
                    <Badge key={tidx} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-800 border-0">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {project.github_url && (
                  <Link href={project.github_url} target="_blank">
                    <Button variant="ghost" size="sm" className="gap-2 px-0">
                      <Github className="h-4 w-4" />
                      View Code
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        <hr className="border-t border-gray-200 dark:border-gray-800 mb-24" />

        {/* Contact Me Section - With Container */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Me</h2>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 bg-gray-50 dark:bg-gray-900">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:janlaurenceolarte@yahoo.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  janlaurenceolarte@yahoo.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:janlaurenceolarte070101@gmail.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  janlaurenceolarte070101@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+639360537373" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  +63 936 053 7373
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Github className="h-5 w-5 flex-shrink-0" />
                <a href={personal.contact.github} target="_blank" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  GitHub Profile
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Linkedin className="h-5 w-5 flex-shrink-0" />
                <a href={personal.contact.linkedin} target="_blank" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </motion.section>

      </div>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}