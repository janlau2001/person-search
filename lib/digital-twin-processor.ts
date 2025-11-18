// lib/digital-twin-processor.ts
import { Index } from '@upstash/vector';
import digitalTwinData from '../digitaltwin.json';

interface ContentChunk {
  id: string;
  title: string;
  type: string;
  content: string;
  metadata: {
    category: string;
    tags: string[];
  };
}

export function generateContentChunks(data: typeof digitalTwinData): ContentChunk[] {
  const chunks: ContentChunk[] = [];
  let chunkId = 1;

  // Personal Information Chunks
  const personal = data.personal;
  chunks.push({
    id: `chunk_${chunkId++}`,
    title: "Personal Introduction",
    type: "personal",
    content: `${personal.name} is a ${personal.title} based in ${personal.location}. ${personal.summary} ${personal.elevator_pitch}`,
    metadata: {
      category: "personal",
      tags: ["introduction", "background", "about"]
    }
  });

  // Hobbies and Interests
  if (personal.personality_traits?.hobbies) {
    const hobbiesText = personal.personality_traits.hobbies.join(", ");
    chunks.push({
      id: `chunk_${chunkId++}`,
      title: "Hobbies and Interests",
      type: "personal",
      content: `${personal.name} enjoys ${hobbiesText}. Favorite food is ${personal.personality_traits.favorite_food} and favorite color is ${personal.personality_traits.favorite_color}.`,
      metadata: {
        category: "personal",
        tags: ["hobbies", "interests", "lifestyle"]
      }
    });
  }

  // Education Chunks
  const education = data.education;
  const coursework = education.relevant_coursework
    .map((course: string | { course: string }) => 
      typeof course === 'string' ? course : course.course
    )
    .join(", ");
  chunks.push({
    id: `chunk_${chunkId++}`,
    title: "Education Background",
    type: "education",
    content: `Currently pursuing ${education.degree} at ${education.university}, expected graduation in ${education.graduation_year}. Relevant coursework includes: ${coursework}.`,
    metadata: {
      category: "education",
      tags: ["university", "degree", "academic"]
    }
  });

  // Experience Chunks
  data.experience.forEach(exp => {
    chunks.push({
      id: `chunk_${chunkId++}`,
      title: `Experience at ${exp.company}`,
      type: "experience",
      content: `Worked as ${exp.title} at ${exp.company} (${exp.duration}). ${exp.description} Key learnings: ${exp.learnings}`,
      metadata: {
        category: "experience",
        tags: ["work", "internship", "professional"]
      }
    });

    // STAR achievements
    exp.achievements_star.forEach(achievement => {
      chunks.push({
        id: `chunk_${chunkId++}`,
        title: `Achievement at ${exp.company}`,
        type: "achievement",
        content: `Situation: ${achievement.situation} Task: ${achievement.task} Action: ${achievement.action} Result: ${achievement.result}`,
        metadata: {
          category: "achievement",
          tags: ["accomplishment", "STAR", "results"]
        }
      });
    });
  });

  // Projects Chunks
  data.projects.forEach(project => {
    const techList = project.technologies.join(", ");
    const achievementsText = typeof project.achievements === 'object' && project.achievements !== null
      ? Object.entries(project.achievements).map(([key, value]) => `${key}: ${value}`).join(", ")
      : String(project.achievements || '');
    const challengesText = Array.isArray(project.challenges_overcome)
      ? project.challenges_overcome.join(". ")
      : String(project.challenges_overcome || '');
    
    chunks.push({
      id: `chunk_${chunkId++}`,
      title: `Project: ${project.name}`,
      type: "project",
      content: `${project.name} - ${project.description} Role: ${project.role}. Technologies used: ${techList}. Achievements: ${achievementsText} Challenges overcome: ${challengesText}`,
      metadata: {
        category: "project",
        tags: ["development", "coding", "portfolio"]
      }
    });
  });

  // Skills Chunks
  const skills = data.skills;
  
  // Programming languages
  const progLangs = skills.programming_languages.map(
    lang => `${lang.language} (${lang.proficiency}, ${lang.years} years)`
  ).join(", ");
  
  chunks.push({
    id: `chunk_${chunkId++}`,
    title: "Programming Languages",
    type: "skills",
    content: `Programming language expertise: ${progLangs}.`,
    metadata: {
      category: "technical_skills",
      tags: ["programming", "coding", "languages"]
    }
  });

  // Frameworks and tools
  const frameworks = (skills.frameworks_libraries || [])
    .map((tool: string | { name: string }) => 
      typeof tool === 'string' ? tool : tool.name
    )
    .join(", ");
  chunks.push({
    id: `chunk_${chunkId++}`,
    title: "Frameworks and Tools",
    type: "skills",
    content: `Experience with frameworks and tools: ${frameworks}.`,
    metadata: {
      category: "technical_skills",
      tags: ["frameworks", "tools", "development"]
    }
  });

  // Databases
  const databases = skills.databases
    .map((db: string | { name: string }) => 
      typeof db === 'string' ? db : db.name
    )
    .join(", ");
  chunks.push({
    id: `chunk_${chunkId++}`,
    title: "Database Experience",
    type: "skills",
    content: `Database experience includes: ${databases}.`,
    metadata: {
      category: "technical_skills",
      tags: ["database", "data", "SQL"]
    }
  });

  // Soft skills
  const softSkills = skills.soft_skills
    .map((skill: string | { skill: string }) => 
      typeof skill === 'string' ? skill : skill.skill
    )
    .join(", ");
  chunks.push({
    id: `chunk_${chunkId++}`,
    title: "Soft Skills",
    type: "skills",
    content: `Key soft skills and personal strengths: ${softSkills}.`,
    metadata: {
      category: "soft_skills",
      tags: ["interpersonal", "communication", "teamwork"]
    }
  });

  // Career Goals
  const career = data.career_goals;
  const shortTerm = typeof career.short_term === 'string' 
    ? career.short_term 
    : career.short_term.primary_goal;
  const longTerm = typeof career.long_term === 'string' 
    ? career.long_term 
    : career.long_term.primary_goal;
  const learning = Array.isArray(career.learning_focus)
    ? career.learning_focus.join(", ")
    : (typeof career.learning_focus === 'object' && career.learning_focus.currently_learning
      ? career.learning_focus.currently_learning.join(", ")
      : '');
  const industries = Array.isArray(career.industries_interested)
    ? career.industries_interested
        .map((item: string | { industry: string }) => 
          typeof item === 'string' ? item : item.industry
        )
        .join(", ")
    : '';
  
  chunks.push({
    id: `chunk_${chunkId++}`,
    title: "Career Goals and Aspirations",
    type: "career",
    content: `Short-term goal: ${shortTerm} Long-term vision: ${longTerm} Currently learning: ${learning}. Interested in industries: ${industries}.`,
    metadata: {
      category: "career",
      tags: ["goals", "aspirations", "future"]
    }
  });

  // Interview Prep
  const interview = data.interview_prep;
  const strengths = interview.strengths
    .map((strength: string | { strength: string }) => 
      typeof strength === 'string' ? strength : strength.strength
    )
    .join(" ");
  
  chunks.push({
    id: `chunk_${chunkId++}`,
    title: "Key Strengths",
    type: "interview",
    content: `Key strengths: ${strengths}`,
    metadata: {
      category: "interview",
      tags: ["strengths", "advantages", "skills"]
    }
  });

  chunks.push({
    id: `chunk_${chunkId++}`,
    title: "Unique Value Proposition",
    type: "interview",
    content: `What makes me unique: ${'unique_value_proposition' in interview ? interview.unique_value_proposition.what_makes_me_different : String((interview as Record<string, unknown>).unique_value || '')} Passion: ${'passion_for_technology' in interview ? interview.passion_for_technology.genuine_interest : String((interview as Record<string, unknown>).passion_projects || '')}`,
    metadata: {
      category: "interview",
      tags: ["value", "differentiation", "unique"]
    }
  });

  chunks.push({
    id: `chunk_${chunkId++}`,
    title: "Why Hire Me",
    type: "interview",
    content: typeof interview.why_hire_me === 'string' 
      ? interview.why_hire_me 
      : interview.why_hire_me.elevator_pitch,
    metadata: {
      category: "interview",
      tags: ["hiring", "value", "pitch"]
    }
  });

  return chunks;
}

export async function uploadToUpstash() {
  const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL!,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
  });

  const chunks = generateContentChunks(digitalTwinData);

  // Prepare vectors for upload
  const vectors = chunks.map(chunk => ({
    id: chunk.id,
    data: `${chunk.title}: ${chunk.content}`,
    metadata: {
      title: chunk.title,
      type: chunk.type,
      content: chunk.content,
      category: chunk.metadata.category,
      tags: chunk.metadata.tags,
    }
  }));

  // Upload to Upstash Vector
  await index.upsert(vectors);

  return {
    success: true,
    chunksCount: chunks.length,
    message: `Successfully uploaded ${chunks.length} chunks to Upstash Vector`
  };
}

export async function queryDigitalTwin(question: string, topK: number = 3) {
  const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL!,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
  });

  const results = await index.query({
    data: question,
    topK,
    includeMetadata: true,
  });

  return results;
}
