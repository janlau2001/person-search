"""
Digital Twin - Content Chunk Generator
This script processes your digitaltwin.json and creates searchable content chunks
"""

import json

def generate_content_chunks(data):
    """Generate searchable content chunks from digital twin data"""
    chunks = []
    chunk_id = 1
    
    # Personal Information Chunks
    personal = data.get('personal', {})
    chunks.append({
        "id": f"chunk_{chunk_id}",
        "title": "Personal Introduction",
        "type": "personal",
        "content": f"{personal.get('name')} is a {personal.get('title')} based in {personal.get('location')}. {personal.get('summary')} {personal.get('elevator_pitch')}",
        "metadata": {
            "category": "personal",
            "tags": ["introduction", "background", "about"]
        }
    })
    chunk_id += 1
    
    # Hobbies and Interests
    if 'hobbies' in personal:
        hobbies_text = ", ".join(personal['hobbies'])
        chunks.append({
            "id": f"chunk_{chunk_id}",
            "title": "Hobbies and Interests",
            "type": "personal",
            "content": f"{personal.get('name')} enjoys {hobbies_text}. Favorite food is {personal.get('favorite_food', 'not specified')} and favorite color is {personal.get('favorite_color', 'not specified')}.",
            "metadata": {
                "category": "personal",
                "tags": ["hobbies", "interests", "lifestyle"]
            }
        })
        chunk_id += 1
    
    # Education Chunks
    education = data.get('education', {})
    coursework = ", ".join(education.get('relevant_coursework', []))
    chunks.append({
        "id": f"chunk_{chunk_id}",
        "title": "Education Background",
        "type": "education",
        "content": f"Currently pursuing {education.get('degree')} at {education.get('university')}, expected graduation in {education.get('graduation_year')}. Relevant coursework includes: {coursework}.",
        "metadata": {
            "category": "education",
            "tags": ["university", "degree", "academic"]
        }
    })
    chunk_id += 1
    
    # Experience Chunks
    for exp in data.get('experience', []):
        # Main experience description
        chunks.append({
            "id": f"chunk_{chunk_id}",
            "title": f"Experience at {exp.get('company')}",
            "type": "experience",
            "content": f"Worked as {exp.get('title')} at {exp.get('company')} ({exp.get('duration')}). {exp.get('description')} Key learnings: {exp.get('learnings')}",
            "metadata": {
                "category": "experience",
                "tags": ["work", "internship", "professional"]
            }
        })
        chunk_id += 1
        
        # STAR achievements
        for achievement in exp.get('achievements_star', []):
            chunks.append({
                "id": f"chunk_{chunk_id}",
                "title": f"Achievement at {exp.get('company')}",
                "type": "achievement",
                "content": f"Situation: {achievement.get('situation')} Task: {achievement.get('task')} Action: {achievement.get('action')} Result: {achievement.get('result')}",
                "metadata": {
                    "category": "achievement",
                    "tags": ["accomplishment", "STAR", "results"]
                }
            })
            chunk_id += 1
    
    # Projects Chunks
    for project in data.get('projects', []):
        tech_list = ", ".join(project.get('technologies', []))
        chunks.append({
            "id": f"chunk_{chunk_id}",
            "title": f"Project: {project.get('name')}",
            "type": "project",
            "content": f"{project.get('name')} - {project.get('description')} Role: {project.get('role')}. Technologies used: {tech_list}. Achievements: {project.get('achievements')} Challenges overcome: {project.get('challenges_overcome')}",
            "metadata": {
                "category": "project",
                "tags": ["development", "coding", "portfolio"]
            }
        })
        chunk_id += 1
    
    # Skills Chunks
    skills = data.get('skills', {})
    
    # Programming languages
    prog_langs = []
    for lang in skills.get('programming_languages', []):
        prog_langs.append(f"{lang['language']} ({lang['proficiency']}, {lang['years']} years)")
    
    chunks.append({
        "id": f"chunk_{chunk_id}",
        "title": "Programming Languages",
        "type": "skills",
        "content": f"Programming language expertise: {', '.join(prog_langs)}.",
        "metadata": {
            "category": "technical_skills",
            "tags": ["programming", "coding", "languages"]
        }
    })
    chunk_id += 1
    
    # Frameworks and tools
    frameworks = ", ".join(skills.get('frameworks_tools', []))
    chunks.append({
        "id": f"chunk_{chunk_id}",
        "title": "Frameworks and Tools",
        "type": "skills",
        "content": f"Experience with frameworks and tools: {frameworks}.",
        "metadata": {
            "category": "technical_skills",
            "tags": ["frameworks", "tools", "development"]
        }
    })
    chunk_id += 1
    
    # Databases
    databases = ", ".join(skills.get('databases', []))
    chunks.append({
        "id": f"chunk_{chunk_id}",
        "title": "Database Experience",
        "type": "skills",
        "content": f"Database experience includes: {databases}.",
        "metadata": {
            "category": "technical_skills",
            "tags": ["database", "data", "SQL"]
        }
    })
    chunk_id += 1
    
    # Soft skills
    soft_skills = ", ".join(skills.get('soft_skills', []))
    chunks.append({
        "id": f"chunk_{chunk_id}",
        "title": "Soft Skills",
        "type": "skills",
        "content": f"Key soft skills and personal strengths: {soft_skills}.",
        "metadata": {
            "category": "soft_skills",
            "tags": ["interpersonal", "communication", "teamwork"]
        }
    })
    chunk_id += 1
    
    # Career Goals
    career = data.get('career_goals', {})
    learning = ", ".join(career.get('learning_focus', []))
    industries = ", ".join(career.get('industries_interested', []))
    
    chunks.append({
        "id": f"chunk_{chunk_id}",
        "title": "Career Goals and Aspirations",
        "type": "career",
        "content": f"Short-term goal: {career.get('short_term')} Long-term vision: {career.get('long_term')} Currently learning: {learning}. Interested in industries: {industries}.",
        "metadata": {
            "category": "career",
            "tags": ["goals", "aspirations", "future"]
        }
    })
    chunk_id += 1
    
    # Interview Prep
    interview = data.get('interview_prep', {})
    strengths = " ".join(interview.get('strengths', []))
    
    chunks.append({
        "id": f"chunk_{chunk_id}",
        "title": "Key Strengths",
        "type": "interview",
        "content": f"Key strengths: {strengths}",
        "metadata": {
            "category": "interview",
            "tags": ["strengths", "advantages", "skills"]
        }
    })
    chunk_id += 1
    
    chunks.append({
        "id": f"chunk_{chunk_id}",
        "title": "Unique Value Proposition",
        "type": "interview",
        "content": f"What makes me unique: {interview.get('unique_value')} Passion projects: {interview.get('passion_projects')}",
        "metadata": {
            "category": "interview",
            "tags": ["value", "differentiation", "unique"]
        }
    })
    chunk_id += 1
    
    chunks.append({
        "id": f"chunk_{chunk_id}",
        "title": "Why Hire Me",
        "type": "interview",
        "content": interview.get('why_hire_me', ''),
        "metadata": {
            "category": "interview",
            "tags": ["hiring", "value", "pitch"]
        }
    })
    chunk_id += 1
    
    return chunks

def main():
    # Load the digital twin JSON
    with open('digitaltwin.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Generate content chunks
    chunks = generate_content_chunks(data)
    
    # Add chunks back to the data
    data['content_chunks'] = chunks
    
    # Save updated JSON
    with open('digitaltwin.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Successfully generated {len(chunks)} content chunks!")
    print(f"📄 Updated digitaltwin.json with searchable content")

if __name__ == "__main__":
    main()
