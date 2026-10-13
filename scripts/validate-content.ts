#!/usr/bin/env node
/**
 * Content Validation Script
 * Checks portfolio data integrity before deploy.
 * Run: npx tsx scripts/validate-content.ts
 */

import { siteConfig } from '../src/data/site';
import { projects } from '../src/data/projects';
import { certificates } from '../src/data/certificates';
import { events } from '../src/data/events';
import { leadershipRoles } from '../src/data/leadership';
import { universityRecord, schoolRecords, academicRows } from '../src/data/academics';
import { Project, Certificate, EventItem, LeadershipRole } from '../src/data/types';

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

const results: ValidationResult = { passed: true, errors: [], warnings: [] };

function error(msg: string) {
  results.passed = false;
  results.errors.push(`❌ ${msg}`);
}

function warn(msg: string) {
  results.warnings.push(`⚠️  ${msg}`);
}

function ok(msg: string) {
  console.log(`✅ ${msg}`);
}

// ---- 1. Site Config ----
console.log('\n📋 Validating siteConfig...');
if (!siteConfig.resumeUrl || siteConfig.resumeUrl === '#resume') {
  error('resumeUrl is placeholder ("#resume") — add public/resume.pdf and update to "/resume.pdf"');
} else {
  ok(`resumeUrl: ${siteConfig.resumeUrl}`);
}

if (!siteConfig.email || siteConfig.email.includes('example.com')) {
  error('email is missing or placeholder');
} else {
  ok(`email: ${siteConfig.email}`);
}

if (!siteConfig.linkedinUrl || siteConfig.linkedinUrl.includes('example.com')) {
  error('linkedinUrl is missing or placeholder');
} else {
  ok(`linkedinUrl: ${siteConfig.linkedinUrl}`);
}

if (!siteConfig.githubUrl || siteConfig.githubUrl.includes('example.com')) {
  error('githubUrl is missing or placeholder');
} else {
  ok(`githubUrl: ${siteConfig.githubUrl}`);
}

// ---- 2. Projects ----
console.log('\n📁 Validating projects...');
projects.forEach((p: Project) => {
  const prefix = `[${p.id}]`;

  if (p.verification === 'placeholder') {
    error(`${prefix} verification is "placeholder"`);
  }

  if (!p.contribution || p.contribution.trim() === '') {
    error(`${prefix} missing "contribution" field (what you personally built)`);
  }

  if (!p.liveUrl || p.liveUrl.includes('.demo')) {
    warn(`${prefix} liveUrl points to .demo domain — deploy real demo or remove button`);
  } else {
    ok(`${prefix} liveUrl: ${p.liveUrl}`);
  }

  if (!p.githubUrl || !p.githubUrl.includes('github.com')) {
    warn(`${prefix} githubUrl missing or not a GitHub URL`);
  } else {
    ok(`${prefix} githubUrl: ${p.githubUrl}`);
  }

  if (!p.role) warn(`${prefix} missing role`);
  if (!p.year) warn(`${prefix} missing year`);
  if (!p.duration) warn(`${prefix} missing duration`);
  if (!p.highlights || p.highlights.length === 0) warn(`${prefix} no highlights`);
  if (!p.cardImage) warn(`${prefix} missing cardImage (screenshot)`);
});

ok(`${projects.length} projects checked`);

// ---- 3. Certificates ----
console.log('\n📜 Validating certificates...');
certificates.forEach((c: Certificate) => {
  const prefix = `[${c.id}]`;

  if (c.verification === 'placeholder') {
    error(`${prefix} verification is "placeholder"`);
  }

  if (!c.credentialUrl || c.credentialUrl.includes('credential.net') || c.credentialUrl === '#') {
    error(`${prefix} credentialUrl is placeholder or generic — must be real verification URL or document link`);
  } else {
    ok(`${prefix} credentialUrl: ${c.credentialUrl}`);
  }

  if (!c.image) {
    warn(`${prefix} missing certificate image`);
  }
});

ok(`${certificates.length} certificates checked`);

// ---- 4. Events ----
console.log('\n🎪 Validating events...');
events.forEach((e: EventItem) => {
  const prefix = `[${e.id}]`;

  if (e.verification === 'placeholder') {
    error(`${prefix} verification is "placeholder"`);
  }

  if (e.badge && !e.poster) {
    warn(`${prefix} has badge but no poster image`);
  }
});

ok(`${events.length} events checked`);

// ---- 5. Leadership ----
console.log('\n👑 Validating leadership roles...');
leadershipRoles.forEach((l: LeadershipRole) => {
  const prefix = `[${l.id}]`;

  if (l.verification === 'placeholder') {
    error(`${prefix} verification is "placeholder"`);
  }

  if (!l.logo) {
    warn(`${prefix} missing logo`);
  }
});

ok(`${leadershipRoles.length} leadership roles checked`);

// ---- 6. Academics ----
console.log('\n🎓 Validating academics...');

// Cross-check academicRows with universityRecord
const btechRow = academicRows.find(r => r.id === 'btech');
if (btechRow) {
  const cgpaMatch = btechRow.score.includes(String(universityRecord.cgpa));
  if (!cgpaMatch) {
    error(`CGPA mismatch: academicRows says "${btechRow.score}", universityRecord says ${universityRecord.cgpa}`);
  } else {
    ok(`CGPA consistent: ${universityRecord.cgpa}`);
  }
}

// Check all semesters present
const expectedSemesters = 5; // Sem 1-5 (Sem 5 current)
if (universityRecord.semesters.length < expectedSemesters) {
  error(`Missing semesters: expected ${expectedSemesters}, got ${universityRecord.semesters.length}`);
} else {
  ok(`All ${expectedSemesters} semesters present (including current)`);
}

// Check school records have subject tables
Object.entries(schoolRecords).forEach(([key, record]) => {
  if (!record.subjects || record.subjects.length === 0) {
    error(`School record ${key} missing subjects table`);
  } else {
    ok(`School record ${key}: ${record.subjects.length} subjects`);
  }
});

// ---- 7. Resume PDF existence ----
console.log('\n📄 Checking resume PDF...');
const fs = await import('fs');
const path = await import('path');
const resumePath = path.resolve('public/resume.pdf');
if (fs.existsSync(resumePath)) {
  ok('public/resume.pdf exists');
} else {
  error('public/resume.pdf NOT FOUND — add your resume PDF to public/');
}

// ---- 8. Image assets ----
console.log('\n🖼️  Checking referenced images...');
const imageRefs = [
  ...projects.flatMap(p => [p.cardImage, ...(p.screenshots || [])].filter(Boolean).map(i => i!.src)),
  ...certificates.flatMap(c => [c.image, c.fullImage].filter(Boolean).map(i => i!.src)),
  ...events.flatMap(e => [e.poster, ...(e.photos || [])].filter(Boolean).map(i => i!.src)),
  ...leadershipRoles.filter(l => l.logo).map(l => l.logo!),
  '/assets/portrait.png',
  '/assets/portrait.webp',
  '/assets/learnpath-featured.png',
];

const missingImages: string[] = [];
imageRefs.forEach(src => {
  const fullPath = path.resolve('public', src.replace(/^\//, ''));
  if (!fs.existsSync(fullPath)) {
    missingImages.push(src);
  }
});

if (missingImages.length > 0) {
  missingImages.forEach(img => warn(`Missing image: ${img}`));
} else {
  ok('All referenced images exist in public/');
}

// ---- Summary ----
console.log('\n' + '='.repeat(60));
if (results.passed && results.warnings.length === 0) {
  console.log('🎉 ALL CHECKS PASSED — Ready to deploy!');
  process.exit(0);
} else if (results.passed) {
  console.log('✅ No blocking errors, but review warnings above.');
  results.warnings.forEach(w => console.log(w));
  process.exit(0);
} else {
  console.log('🚫 BLOCKING ERRORS — Fix before deploy:');
  results.errors.forEach(e => console.log(e));
  if (results.warnings.length > 0) {
    console.log('\nWarnings:');
    results.warnings.forEach(w => console.log(w));
  }
  process.exit(1);
}