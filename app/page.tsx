'use client';

import { FloatingChatbot } from '@/components/floating-chatbot';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import digitalTwinData from '../digitaltwin.json';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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

        {/* Experience */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Experience</h2>
          <div className="space-y-12">
            {experience.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-gray-200 dark:border-gray-800 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-500">{exp.duration}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{exp.company}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technical_skills_used.map((skill, sidx) => (
                    <Badge key={sidx} variant="outline" className="text-xs border-gray-300 dark:border-gray-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Education</h2>
          <div className="border-l-2 border-gray-200 dark:border-gray-800 pl-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{education.degree}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{education.university}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">Expected Graduation: {education.graduation_year}</p>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {education.relevant_coursework.map((course, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs border-gray-300 dark:border-gray-700">
                    {typeof course === 'string' ? course : course.course}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Skills</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Languages</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.programming_languages.map((lang, idx) => (
                  <div key={idx}>
                    <p className="font-medium text-gray-900 dark:text-white">{lang.language}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {(skills.frameworks_libraries || []).map((tool: string | { name: string }, idx: number) => (
                  <Badge key={idx} variant="outline" className="border-gray-300 dark:border-gray-700">
                    {typeof tool === 'string' ? tool : tool.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {skills.databases.map((db: string | { name: string }, idx: number) => (
                  <Badge key={idx} variant="outline" className="border-gray-300 dark:border-gray-700">
                    {typeof db === 'string' ? db : db.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

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

        {/* Contact Section - Minimal */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Mail className="h-5 w-5" />
              <a href="mailto:janlaurenceolarte@yahoo.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                janlaurenceolarte@yahoo.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Mail className="h-5 w-5" />
              <a href="mailto:janlaurenceolarte070101@gmail.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                janlaurenceolarte070101@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Phone className="h-5 w-5" />
              <a href="tel:+639360537373" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                +63 936 053 7373
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Github className="h-5 w-5" />
              <a href={personal.contact.github} target="_blank" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                GitHub Profile
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Linkedin className="h-5 w-5" />
              <a href={personal.contact.linkedin} target="_blank" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                LinkedIn Profile
              </a>
            </div>
          </div>
        </motion.section>

      </div>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
