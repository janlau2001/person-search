import { FloatingChatbot } from '@/components/floating-chatbot';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, MapPin, GraduationCap, Briefcase, Code, Heart } from 'lucide-react';
import Link from 'next/link';
import digitalTwinData from '../digitaltwin.json';

export default function Home() {
  const { personal, education, experience, skills, projects } = digitalTwinData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="mb-6">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {personal.name}
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
              {personal.title}
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
              <MapPin className="h-4 w-4" />
              <span>{personal.location}</span>
            </div>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {personal.summary}
          </p>

          {/* Contact Links */}
          <div className="flex items-center justify-center gap-4">
            <Link href={personal.contact.github} target="_blank">
              <Button variant="outline" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </Link>
            <Link href={personal.contact.linkedin} target="_blank">
              <Button variant="outline" size="sm">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </Link>
            <Link href={`mailto:${personal.contact.email.split('/')[0]}`}>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <Card className="p-8 bg-white dark:bg-gray-800 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Heart className="h-7 w-7 text-red-500" />
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Hobbies & Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {personal.hobbies?.map((hobby, idx) => (
                    <Badge key={idx} variant="secondary">{hobby}</Badge>
                  ))}
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>🍔 Favorite Food: {personal.favorite_food}</p>
                  <p>🎨 Favorite Color: {personal.favorite_color}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Elevator Pitch</h3>
                <p className="text-gray-700 dark:text-gray-300">{personal.elevator_pitch}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Education */}
        <section className="mb-16">
          <Card className="p-8 bg-white dark:bg-gray-800 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="h-7 w-7 text-blue-600" />
              Education
            </h2>
            <div>
              <h3 className="text-xl font-semibold">{education.degree}</h3>
              <p className="text-gray-600 dark:text-gray-400">{education.university}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Expected Graduation: {education.graduation_year}</p>
              <div>
                <h4 className="font-semibold mb-2">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  {education.relevant_coursework.map((course, idx) => (
                    <Badge key={idx} variant="outline">{course}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <Card className="p-8 bg-white dark:bg-gray-800 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="h-7 w-7 text-green-600" />
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">{exp.duration}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technical_skills_used.map((skill, sidx) => (
                      <Badge key={sidx} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Technical Skills */}
        <section className="mb-16">
          <Card className="p-8 bg-white dark:bg-gray-800 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Code className="h-7 w-7 text-purple-600" />
              Technical Skills
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Programming Languages</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skills.programming_languages.map((lang, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="font-semibold">{lang.language}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{lang.proficiency} • {lang.years} years</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Frameworks & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks_tools.map((tool, idx) => (
                    <Badge key={idx} variant="outline">{tool}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.databases.map((db, idx) => (
                    <Badge key={idx} variant="outline">{db}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.soft_skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <Card className="p-8 bg-white dark:bg-gray-800 shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <Card key={idx} className="p-6 bg-gray-50 dark:bg-gray-700">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, tidx) => (
                      <Badge key={tidx} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.github_url && (
                      <Link href={project.github_url} target="_blank">
                        <Button variant="outline" size="sm">
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </Button>
                      </Link>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </section>

      </div>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
