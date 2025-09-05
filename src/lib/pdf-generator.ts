import jsPDF from 'jspdf';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

export function generateResumePDF(resumeData: ResumeData, enhancedContent?: string): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const lineHeight = 6;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line: string) => {
      if (y > doc.internal.pageSize.height - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, x, y);
      y += lineHeight;
    });
    return y;
  };

  // Header - Personal Information
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(resumeData.personalInfo.fullName, margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const contactInfo = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location
  ].filter(Boolean).join(' | ');
  
  doc.text(contactInfo, margin, yPosition);
  yPosition += lineHeight;

  if (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio) {
    const links = [
      resumeData.personalInfo.linkedin,
      resumeData.personalInfo.portfolio
    ].filter(Boolean).join(' | ');
    doc.text(links, margin, yPosition);
    yPosition += lineHeight;
  }

  yPosition += 5;

  // If we have enhanced content, use it instead of structured data
  if (enhancedContent) {
    yPosition = addWrappedText(enhancedContent, margin, yPosition, pageWidth - 2 * margin);
  } else {
    // Professional Summary
    if (resumeData.summary) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      yPosition = addWrappedText(resumeData.summary, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 5;
    }

    // Experience
    if (resumeData.experience.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL EXPERIENCE', margin, yPosition);
      yPosition += 8;

      resumeData.experience.forEach((exp) => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(exp.position, margin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`, margin, yPosition);
        yPosition += 6;

        exp.description.forEach((desc) => {
          yPosition = addWrappedText(`• ${desc}`, margin + 5, yPosition, pageWidth - 2 * margin - 5);
        });
        yPosition += 3;
      });
    }

    // Education
    if (resumeData.education.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EDUCATION', margin, yPosition);
      yPosition += 8;

      resumeData.education.forEach((edu) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(edu.degree, margin, yPosition);
        yPosition += 6;

        doc.setFont('helvetica', 'normal');
        const eduInfo = `${edu.institution} | ${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`;
        doc.text(eduInfo, margin, yPosition);
        yPosition += 8;
      });
    }

    // Skills
    if (resumeData.skills.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('TECHNICAL SKILLS', margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const skillsText = resumeData.skills.join(', ');
      yPosition = addWrappedText(skillsText, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 5;
    }

    // Projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('PROJECTS', margin, yPosition);
      yPosition += 8;

      resumeData.projects.forEach((project) => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(project.name, margin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        yPosition = addWrappedText(project.description, margin, yPosition, pageWidth - 2 * margin);
        
        if (project.technologies.length > 0) {
          const techText = `Technologies: ${project.technologies.join(', ')}`;
          yPosition = addWrappedText(techText, margin, yPosition, pageWidth - 2 * margin);
        }
        yPosition += 3;
      });
    }
  }

  return doc;
}

export function downloadPDF(doc: jsPDF, filename = 'resume.pdf') {
  doc.save(filename);
}